from flask import Flask, jsonify, request, send_from_directory, redirect, make_response, g
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()  # Must be before import supabase_sync so env vars are available

import os, json, time, random, uuid, threading, secrets
import supabase_sync
from functools import wraps
from collections import deque
from datetime import datetime, timedelta
import requests as http_requests

app = Flask(__name__, static_folder=".", static_url_path="")

# ── Twitch OAuth config ──────────────────────────────────────
TWITCH_CLIENT_ID     = os.getenv("TWITCH_CLIENT_ID", "")
TWITCH_CLIENT_SECRET = os.getenv("TWITCH_CLIENT_SECRET", "")
TWITCH_REDIRECT_URI  = os.getenv("TWITCH_REDIRECT_URI", "http://localhost:5000/auth/twitch/callback")
SITE_ORIGIN          = os.getenv("SITE_ORIGIN", "http://localhost:3001")

CORS(app, supports_credentials=True, origins=[SITE_ORIGIN, "http://localhost:3000"])

BADGES_FILE        = "badges.json"
LIMITED_FILE       = "limited_badges.json"
LAST_USER_FILE     = "last_user.txt"
DISCORD_WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK_URL", "")
CURRENT_SEASON      = os.getenv("CURRENT_SEASON", "saison3")
overlay_theme       = "auto"  # "dark", "light", or "auto"

spin_queue = deque()
_badges_lock   = threading.Lock()
_sessions_lock = threading.Lock()
_trades_lock   = threading.Lock()

SESSIONS_FILE        = "sessions.json"
TRADES_FILE          = "trades.json"
SESSION_DURATION_DAYS = 7

# ── Streak state ──────────────────────────────────────────────
streak_state = {
    "timestamps": deque(maxlen=20),
    "window_s": 30,
    "threshold": 3,
    "active_until": 0.0,
    "boost_duration_s": 60,
}

WEIGHTS_NORMAL = {"COMMON": 50, "RARE": 30, "EPIC": 17, "LEGENDARY": 3}
WEIGHTS_STREAK = {"COMMON": 30, "RARE": 30, "EPIC": 25, "LEGENDARY": 15}

# ── Supabase wheel settings cache ────────────────────────────
_wheel_cache = {"weights": None, "fetched_at": 0, "ttl": 30}  # cache 30s

def fetch_wheel_weights():
    """Fetch wheel drop rates from Supabase game_settings, cached for 30s."""
    now = time.time()
    if _wheel_cache["weights"] and (now - _wheel_cache["fetched_at"]) < _wheel_cache["ttl"]:
        return _wheel_cache["weights"]
    try:
        url = os.getenv("SUPABASE_URL", "")
        key = os.getenv("SUPABASE_SERVICE_KEY", "") or os.getenv("SUPABASE_ANON_KEY", "")
        if not url or not key:
            return None
        res = http_requests.post(
            f"{url}/rest/v1/rpc/get_game_settings",
            headers={"apikey": key, "Authorization": f"Bearer {key}", "Content-Type": "application/json"},
            json={}, timeout=5
        )
        if res.status_code != 200:
            return None
        data = res.json()
        mult = float(data.get("wheel_rates_multiplier", "1"))
        weights = {
            "COMMON":    float(data.get("wheel_drop_common", data.get("drop_common", "0.4835"))) * 100,
            "RARE":      float(data.get("wheel_drop_rare", data.get("drop_rare", "0.30"))) * 100 * mult,
            "EPIC":      float(data.get("wheel_drop_epic", data.get("drop_epic", "0.15"))) * 100 * mult,
            "LEGENDARY": float(data.get("wheel_drop_legendary", data.get("drop_legendary", "0.01"))) * 100 * mult,
            "UNIQUE":    float(data.get("wheel_drop_unique", data.get("drop_unique", "0.001"))) * 100 * mult,
            "SUB":       float(data.get("wheel_drop_sub", data.get("drop_sub", "0.005"))) * 100 * mult,
        }
        _wheel_cache["weights"] = weights
        _wheel_cache["fetched_at"] = now
        print(f"[WHEEL] Taux chargés depuis Supabase: {weights}")
        return weights
    except Exception as e:
        print(f"[WHEEL] Erreur fetch Supabase: {e}")
        return None

RARITY_POINTS = {"COMMON": 1, "RARE": 2, "EPIC": 3, "LEGENDARY": 5, "UNIQUE": 8}



# ── Utilitaires badges ────────────────────────────────────────

def load_badges():
    if not os.path.exists(BADGES_FILE):
        return {}
    with _badges_lock:
        with open(BADGES_FILE, "r", encoding="utf-8") as f:
            return json.load(f)

def save_badges(data):
    with _badges_lock:
        with open(BADGES_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

def ensure_user(data, username):
    if username not in data:
        data[username] = {"saison1": [], "saison2": [], "saison3": []}
    elif isinstance(data[username], list):
        data[username] = {"saison1": data[username], "saison2": [], "saison3": []}
    else:
        if "saison3" not in data[username]:
            data[username]["saison3"] = []
    return data

def count_rarities(badge_list):
    counts = {"common": 0, "rare": 0, "epic": 0, "legendary": 0, "unique": 0}
    for b in badge_list:
        key = b.lower()
        if key in counts:
            counts[key] += 1
    return counts

def user_total_pts(user_data):
    total = 0
    for season_list in user_data.values():
        if isinstance(season_list, list):
            for b in season_list:
                total += RARITY_POINTS.get(b.upper(), 0)
    return total

def save_last_user(user_and_season):
    with open(LAST_USER_FILE, "w", encoding="utf-8") as f:
        f.write(user_and_season)

def load_last_user():
    if not os.path.exists(LAST_USER_FILE):
        return None
    with open(LAST_USER_FILE, "r", encoding="utf-8") as f:
        return f.read().strip() or None

# ── Utilitaires limited badges ────────────────────────────────

def load_limited():
    if not os.path.exists(LIMITED_FILE):
        return []
    with open(LIMITED_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_limited(data):
    with open(LIMITED_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def get_active_limited_events():
    now = datetime.utcnow().isoformat()
    return [
        e for e in load_limited()
        if e.get("active_from", "") <= now <= e.get("active_until", "9999")
        and (e.get("max_count", 0) == 0 or e.get("given_count", 0) < e.get("max_count", 0))
    ]

# ── Utilitaires sessions ─────────────────────────────────────

def load_sessions():
    if not os.path.exists(SESSIONS_FILE):
        return {}
    with _sessions_lock:
        with open(SESSIONS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)

def save_sessions(data):
    with _sessions_lock:
        with open(SESSIONS_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

def create_session(twitch_info):
    token = secrets.token_hex(32)
    sessions = load_sessions()
    now = datetime.utcnow()
    sessions[token] = {
        "twitch_id": twitch_info["id"],
        "twitch_login": twitch_info["login"],
        "twitch_display_name": twitch_info["display_name"],
        "twitch_profile_image": twitch_info.get("profile_image_url", ""),
        "created_at": now.isoformat() + "Z",
        "expires_at": (now + timedelta(days=SESSION_DURATION_DAYS)).isoformat() + "Z",
    }
    save_sessions(sessions)
    return token

def get_current_user():
    token = request.cookies.get("session_token")
    if not token:
        return None
    sessions = load_sessions()
    session = sessions.get(token)
    if not session:
        return None
    if datetime.utcnow().isoformat() > session.get("expires_at", ""):
        del sessions[token]
        save_sessions(sessions)
        return None
    return session

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        user = get_current_user()
        if not user:
            return jsonify({"error": "unauthorized"}), 401
        g.user = user
        return f(*args, **kwargs)
    return decorated

# ── Utilitaires trades ───────────────────────────────────────

def load_trades():
    if not os.path.exists(TRADES_FILE):
        return []
    with _trades_lock:
        with open(TRADES_FILE, "r", encoding="utf-8") as f:
            return json.load(f)

def save_trades(data):
    with _trades_lock:
        with open(TRADES_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

def find_user_data(data, username):
    """Case-insensitive lookup in badges data, skipping linked_users."""
    for k, v in data.items():
        if k.lower() == username.lower() and k != "linked_users":
            ud = v if isinstance(v, dict) else {"saison1": v, "saison2": []}
            return k, ud
    return None, None

# ── Logique streak ────────────────────────────────────────────

def record_sub_for_streak():
    now = time.time()
    ts = streak_state["timestamps"]
    ts.append(now)
    cutoff = now - streak_state["window_s"]
    recent = [t for t in ts if t >= cutoff]
    streak_state["timestamps"] = deque(recent, maxlen=20)
    if len(recent) >= streak_state["threshold"]:
        streak_state["active_until"] = now + streak_state["boost_duration_s"]
        print(f"[STREAK] ⚡ Activé ! ({len(recent)} subs en {streak_state['window_s']}s)")

def is_streak_active():
    return time.time() < streak_state["active_until"]

def streak_progress():
    now = time.time()
    cutoff = now - streak_state["window_s"]
    recent = [t for t in streak_state["timestamps"] if t >= cutoff]
    return len(recent), streak_state["threshold"]

# ── Roll serveur-side ─────────────────────────────────────────

def roll_badge():
    limited_events = get_active_limited_events()

    # Try Supabase wheel weights first, fallback to hardcoded
    supabase_weights = fetch_wheel_weights()
    if supabase_weights:
        weights = dict(supabase_weights)
    else:
        weights = dict(WEIGHTS_STREAK if is_streak_active() else WEIGHTS_NORMAL)

    for event in limited_events:
        rarity = event.get("rarity", "UNIQUE").upper()
        weights[rarity] = weights.get(rarity, 0) + event.get("bonus_weight", 10)

    total = sum(weights.values())
    rand = random.random() * total
    for badge, w in weights.items():
        if rand < w:
            return badge
        rand -= w
    return "COMMON"

def notify_discord(username, badge):
    if not DISCORD_WEBHOOK_URL:
        return
    color_map = {"LEGENDARY": "🟡", "UNIQUE": "💜"}
    emoji = color_map.get(badge, "🎖️")
    try:
        import requests as req
        req.post(DISCORD_WEBHOOK_URL, json={
            "content": f"{emoji} **{username}** vient de gagner un badge **{badge}** ! 🎉"
        }, timeout=3)
    except Exception as e:
        print(f"[DISCORD WEBHOOK] Erreur : {e}")

def do_add_badge(username, badge, season=None):
    if season is None:
        season = CURRENT_SEASON
    data = load_badges()
    data = ensure_user(data, username)
    data[username][season].append(badge)
    save_badges(data)

    # Sync to Supabase (background, non-blocking)
    supabase_sync.add_badge(username, season, badge)

    limited_events = get_active_limited_events()
    for event in limited_events:
        if event.get("rarity", "").upper() == badge.upper():
            event["given_count"] = event.get("given_count", 0) + 1
            save_limited(load_limited())
            break

    print(f"[SERVER] {username} ← {badge} ({season})")

# ── Routes legacy (compat) ────────────────────────────────────

@app.route("/badges/<username>")
def get_badges(username):
    data = load_badges()
    user_data = data.get(username.lower(), {"saison1": [], "saison2": []})
    if isinstance(user_data, list):
        user_data = {"saison1": user_data, "saison2": []}
    # Fetch saison3 from Supabase in real-time
    user_data["saison3"] = fetch_supabase_badges(username.lower(), "saison3")
    return jsonify({username.lower(): user_data})

def fetch_supabase_badges(username, season):
    """Fetch badges for a user/season from Supabase."""
    url = os.getenv("SUPABASE_URL", "")
    key = os.getenv("SUPABASE_SERVICE_KEY", "")
    if not url or not key:
        return []
    try:
        res = http_requests.get(
            f"{url}/rest/v1/badges?username=eq.{username}&season=eq.{season}&select=rarity",
            headers={"apikey": key, "Authorization": f"Bearer {key}"},
            timeout=5
        )
        if res.status_code == 200:
            return [row["rarity"].upper() for row in res.json()]
    except Exception as e:
        print(f"[SUPABASE] fetch_badges error: {e}")
    return []

@app.route("/set_user")
def set_user():
    raw = request.args.get("user")
    season = request.args.get("season", CURRENT_SEASON)
    if not raw:
        return jsonify({"error": "missing user"}), 400
    parts = raw.split()
    username = parts[1].strip() if len(parts) > 1 else raw.strip()
    save_last_user(f"{username}|{season}")
    print(f"[SERVER] Nouveau user: {username} (season={season})")
    return jsonify({"ok": True, "user": username, "season": season})

@app.route("/get_user")
def get_user():
    data = load_last_user()
    if not data:
        return jsonify({"user": None, "season": CURRENT_SEASON})
    if "|" in data:
        user, season = data.split("|", 1)
    else:
        user, season = data, CURRENT_SEASON
    return jsonify({"user": user, "season": season})

@app.route("/add")
def add_badge():
    username = request.args.get("user", "").strip()
    badge    = request.args.get("badge", "").strip().upper()
    season   = request.args.get("season", CURRENT_SEASON)
    if not username or not badge:
        return jsonify({"success": False, "error": "Missing user or badge"}), 400
    do_add_badge(username, badge, season)
    if badge in ("LEGENDARY", "UNIQUE"):
        notify_discord(username, badge)
    return jsonify({"success": True, "user": username, "badge": badge})

@app.route("/enqueue_spin", methods=["POST"])
def enqueue_spin():
    data = request.json or {}
    user = data.get("user")
    is_sub = data.get("is_sub", False)
    if user:
        if is_sub:
            record_sub_for_streak()
        spin_queue.append(user)
        print(f"[QUEUE] Ajouté → {user} (streak_active={is_streak_active()})")
        return "OK"
    return "Missing user", 400

@app.route("/get_spin_user")
def get_spin_user():
    if spin_queue:
        user = spin_queue.popleft()
        return jsonify({"user": user})
    return jsonify({"user": None})

# ── Nouveau endpoint : roll serveur-side ──────────────────────

@app.route("/get_spin_result")
def get_spin_result():
    """
    Consommé par ligne.html.
    Tire la rareté côté serveur, sauvegarde, notifie Discord si besoin.
    Retourne {user, badge, streak_active} ou {user: null}.
    """
    if not spin_queue:
        return jsonify({"user": None, "badge": None, "streak_active": False})

    user  = spin_queue.popleft()
    badge = roll_badge()
    do_add_badge(user, badge)

    if badge in ("LEGENDARY", "UNIQUE"):
        notify_discord(user, badge)

    print(f"[SPIN] {user} → {badge} (streak={is_streak_active()})")
    return jsonify({"user": user, "badge": badge, "streak_active": is_streak_active()})

# ── API dashboard ─────────────────────────────────────────────

@app.route("/api/stats")
def api_stats():
    data = load_badges()
    by_rarity = {"COMMON": 0, "RARE": 0, "EPIC": 0, "LEGENDARY": 0, "UNIQUE": 0}
    total_badges = 0
    for user_data in data.values():
        if isinstance(user_data, dict):
            for season_list in user_data.values():
                if isinstance(season_list, list):
                    for b in season_list:
                        k = b.upper()
                        if k in by_rarity:
                            by_rarity[k] += 1
                        total_badges += 1
    current, threshold = streak_progress()
    return jsonify({
        "total_badges": total_badges,
        "total_users": len(data),
        "by_rarity": by_rarity,
        "queue_size": len(spin_queue),
        "streak_active": is_streak_active(),
        "streak_progress": current,
        "streak_threshold": threshold,
    })

@app.route("/api/users")
def api_users():
    data = load_badges()
    result = []
    for username, user_data in data.items():
        if username == "linked_users":
            continue
        if isinstance(user_data, list):
            user_data = {"saison1": user_data, "saison2": [], "saison3": []}
        entry = {
            "username": username,
            "saison1": count_rarities(user_data.get("saison1", [])),
            "saison2": count_rarities(user_data.get("saison2", [])),
            "saison3": count_rarities(user_data.get("saison3", [])),
            "total_pts": user_total_pts(user_data),
        }
        result.append(entry)
    result.sort(key=lambda x: x["total_pts"], reverse=True)
    return jsonify(result)

@app.route("/api/badges/<username>", methods=["POST"])
def api_add_badge(username):
    body   = request.json or {}
    season = body.get("season", CURRENT_SEASON)
    rarity = body.get("rarity", "").upper()
    if not rarity:
        return jsonify({"error": "missing rarity"}), 400
    do_add_badge(username, rarity, season)
    return jsonify({"ok": True})

@app.route("/api/badges/<username>/<season>/<rarity>", methods=["DELETE"])
def api_delete_badge(username, season, rarity):
    rarity = rarity.upper()
    data = load_badges()
    if username not in data:
        return jsonify({"error": "user not found"}), 404
    user_data = data[username]
    if isinstance(user_data, list):
        user_data = {"saison1": user_data, "saison2": []}
        data[username] = user_data
    season_list = user_data.get(season, [])
    if rarity not in season_list:
        return jsonify({"error": "badge not found"}), 404
    season_list.remove(rarity)
    save_badges(data)

    # Sync to Supabase
    supabase_sync.remove_badge(username, season, rarity)

    return jsonify({"ok": True})

@app.route("/api/limited_badges", methods=["GET"])
def api_get_limited():
    return jsonify(load_limited())

@app.route("/api/limited_badges", methods=["POST"])
def api_create_limited():
    body = request.json or {}
    required = ("rarity", "active_from", "active_until")
    if not all(body.get(k) for k in required):
        return jsonify({"error": f"missing fields: {required}"}), 400
    event = {
        "id": str(uuid.uuid4()),
        "rarity": body["rarity"].upper(),
        "name": body.get("name", ""),
        "active_from": body["active_from"],
        "active_until": body["active_until"],
        "max_count": int(body.get("max_count", 0)),
        "given_count": 0,
        "bonus_weight": int(body.get("bonus_weight", 10)),
    }
    events = load_limited()
    events.append(event)
    save_limited(events)
    return jsonify(event), 201

@app.route("/api/limited_badges/<event_id>", methods=["DELETE"])
def api_delete_limited(event_id):
    events = load_limited()
    new = [e for e in events if e.get("id") != event_id]
    if len(new) == len(events):
        return jsonify({"error": "not found"}), 404
    save_limited(new)
    return jsonify({"ok": True})

@app.route("/api/config", methods=["GET"])
def api_get_config():
    return jsonify({
        "current_season": CURRENT_SEASON,
        "webhook_configured": bool(DISCORD_WEBHOOK_URL),
        "streak_window_s": streak_state["window_s"],
        "streak_threshold": streak_state["threshold"],
        "streak_boost_duration_s": streak_state["boost_duration_s"],
        "overlay_theme": overlay_theme,
    })

@app.route("/api/config", methods=["POST"])
def api_set_config():
    global CURRENT_SEASON, DISCORD_WEBHOOK_URL, overlay_theme
    body = request.json or {}
    if "current_season" in body:
        CURRENT_SEASON = body["current_season"]
    if "discord_webhook_url" in body:
        DISCORD_WEBHOOK_URL = body["discord_webhook_url"]
    if "streak_window_s" in body:
        streak_state["window_s"] = int(body["streak_window_s"])
    if "streak_threshold" in body:
        streak_state["threshold"] = int(body["streak_threshold"])
    if "overlay_theme" in body:
        overlay_theme = body["overlay_theme"]  # "dark", "light", or "auto"
    return jsonify({"ok": True})

# ── Auth Twitch ──────────────────────────────────────────────

@app.route("/auth/twitch")
def auth_twitch():
    state = secrets.token_hex(16)
    resp = redirect(
        f"https://id.twitch.tv/oauth2/authorize"
        f"?client_id={TWITCH_CLIENT_ID}"
        f"&redirect_uri={TWITCH_REDIRECT_URI}"
        f"&response_type=code"
        f"&scope=user:read:email"
        f"&state={state}"
    )
    resp.set_cookie("oauth_state", state, httponly=True, max_age=300, samesite="Lax")
    return resp

@app.route("/auth/twitch/callback")
def auth_twitch_callback():
    code = request.args.get("code")
    state = request.args.get("state")
    stored_state = request.cookies.get("oauth_state")

    if not code or not state or state != stored_state:
        return "Invalid OAuth state", 400

    token_resp = http_requests.post("https://id.twitch.tv/oauth2/token", data={
        "client_id": TWITCH_CLIENT_ID,
        "client_secret": TWITCH_CLIENT_SECRET,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": TWITCH_REDIRECT_URI,
    }, timeout=10)

    if token_resp.status_code != 200:
        print(f"[AUTH] Token exchange failed: {token_resp.text}")
        return "Token exchange failed", 400

    access_token = token_resp.json().get("access_token")

    user_resp = http_requests.get("https://api.twitch.tv/helix/users", headers={
        "Authorization": f"Bearer {access_token}",
        "Client-Id": TWITCH_CLIENT_ID,
    }, timeout=10)

    if user_resp.status_code != 200:
        print(f"[AUTH] User info failed: {user_resp.text}")
        return "Failed to get user info", 400

    twitch_user = user_resp.json()["data"][0]
    session_token = create_session(twitch_user)
    print(f"[AUTH] Login: {twitch_user['display_name']} ({twitch_user['login']})")

    resp = redirect(SITE_ORIGIN)
    resp.set_cookie(
        "session_token", session_token,
        httponly=True, max_age=SESSION_DURATION_DAYS * 86400, samesite="Lax",
    )
    resp.delete_cookie("oauth_state")
    return resp

@app.route("/auth/logout", methods=["POST"])
def auth_logout():
    token = request.cookies.get("session_token")
    if token:
        sessions = load_sessions()
        sessions.pop(token, None)
        save_sessions(sessions)
    resp = make_response(jsonify({"ok": True}))
    resp.delete_cookie("session_token")
    return resp

# ── Site public API ──────────────────────────────────────────

@app.route("/site/me")
@require_auth
def site_me():
    user = g.user
    data = load_badges()
    _, user_badges = find_user_data(data, user["twitch_login"])
    if user_badges is None:
        user_badges = {"saison1": [], "saison2": []}
    return jsonify({
        "twitch_login": user["twitch_login"],
        "twitch_display_name": user["twitch_display_name"],
        "twitch_profile_image": user["twitch_profile_image"],
        "badges": user_badges,
        "total_pts": user_total_pts(user_badges),
    })

@app.route("/site/leaderboard")
def site_leaderboard():
    data = load_badges()
    rarity_order = ["UNIQUE", "LEGENDARY", "EPIC", "RARE", "COMMON"]
    entries = []
    for username, user_data in data.items():
        if username == "linked_users":
            continue
        if isinstance(user_data, list):
            user_data = {"saison1": user_data, "saison2": []}
        pts = user_total_pts(user_data)
        badge_count = sum(len(v) for v in user_data.values() if isinstance(v, list))
        all_badges = [b.upper() for sl in user_data.values() if isinstance(sl, list) for b in sl]
        top_rarity = next((r for r in rarity_order if r in all_badges), "NONE")
        entries.append({
            "username": username,
            "total_pts": pts,
            "badge_count": badge_count,
            "top_rarity": top_rarity,
        })
    entries.sort(key=lambda x: x["total_pts"], reverse=True)
    for i, e in enumerate(entries):
        e["rank"] = i + 1
    return jsonify(entries)

@app.route("/site/user/<username>")
def site_user_profile(username):
    data = load_badges()
    actual_key, user_data = find_user_data(data, username)
    if user_data is None:
        return jsonify({"error": "user not found"}), 404

    badges_by_season = {}
    for season, badge_list in user_data.items():
        if isinstance(badge_list, list):
            badges_by_season[season] = count_rarities(badge_list)

    my_pts = user_total_pts(user_data)
    all_pts = sorted(
        [user_total_pts(v if isinstance(v, dict) else {"saison1": v, "saison2": []})
         for k, v in data.items() if k != "linked_users"],
        reverse=True,
    )
    rank = all_pts.index(my_pts) + 1 if my_pts in all_pts else len(all_pts)

    return jsonify({
        "username": actual_key,
        "badges": badges_by_season,
        "total_pts": my_pts,
        "rank": rank,
    })

@app.route("/site/users")
def site_users_list():
    """Returns a simple list of all usernames (for trade autocomplete)."""
    data = load_badges()
    users = [k for k in data.keys() if k != "linked_users"]
    return jsonify(users)

# ── Trades ───────────────────────────────────────────────────

@app.route("/site/trades", methods=["POST"])
@require_auth
def site_create_trade():
    body = request.json or {}
    from_user = g.user["twitch_login"]
    to_user = body.get("to_user", "").strip().lower()
    from_badge = body.get("from_badge", {})
    to_badge = body.get("to_badge", {})

    if not to_user or not from_badge.get("season") or not from_badge.get("rarity") \
       or not to_badge.get("season") or not to_badge.get("rarity"):
        return jsonify({"error": "missing fields"}), 400

    if from_user.lower() == to_user:
        return jsonify({"error": "cannot trade with yourself"}), 400

    data = load_badges()
    _, from_data = find_user_data(data, from_user)
    if not from_data:
        return jsonify({"error": "you have no badges"}), 400

    from_list = from_data.get(from_badge["season"], [])
    if from_badge["rarity"].upper() not in [b.upper() for b in from_list]:
        return jsonify({"error": "you don't have this badge"}), 400

    _, to_data = find_user_data(data, to_user)
    if not to_data:
        return jsonify({"error": "target user not found"}), 404

    to_list = to_data.get(to_badge["season"], [])
    if to_badge["rarity"].upper() not in [b.upper() for b in to_list]:
        return jsonify({"error": "target user doesn't have this badge"}), 400

    trade = {
        "id": str(uuid.uuid4()),
        "from_user": from_user,
        "to_user": to_user,
        "from_badge": {"season": from_badge["season"], "rarity": from_badge["rarity"].upper()},
        "to_badge": {"season": to_badge["season"], "rarity": to_badge["rarity"].upper()},
        "status": "pending",
        "created_at": datetime.utcnow().isoformat() + "Z",
        "resolved_at": None,
    }
    trades = load_trades()
    trades.append(trade)
    save_trades(trades)
    return jsonify(trade), 201

@app.route("/site/trades", methods=["GET"])
@require_auth
def site_list_trades():
    login = g.user["twitch_login"].lower()
    status_filter = request.args.get("status")
    trades = load_trades()

    incoming, outgoing = [], []
    for t in trades:
        if status_filter and t.get("status") != status_filter:
            continue
        if t["to_user"].lower() == login:
            incoming.append(t)
        elif t["from_user"].lower() == login:
            outgoing.append(t)
    return jsonify({"incoming": incoming, "outgoing": outgoing})

@app.route("/site/trades/<trade_id>/accept", methods=["POST"])
@require_auth
def site_accept_trade(trade_id):
    login = g.user["twitch_login"].lower()
    trades = load_trades()
    trade = next((t for t in trades if t["id"] == trade_id), None)

    if not trade:
        return jsonify({"error": "trade not found"}), 404
    if trade["to_user"].lower() != login:
        return jsonify({"error": "forbidden"}), 403
    if trade["status"] != "pending":
        return jsonify({"error": "trade is not pending"}), 400

    data = load_badges()
    fb, tb = trade["from_badge"], trade["to_badge"]

    from_key, from_data = find_user_data(data, trade["from_user"])
    to_key, to_data = find_user_data(data, trade["to_user"])

    if not from_key or not to_key:
        trade["status"] = "rejected"
        trade["resolved_at"] = datetime.utcnow().isoformat() + "Z"
        save_trades(trades)
        return jsonify({"error": "user not found in badges"}), 400

    from_list = from_data.get(fb["season"], [])
    to_list = to_data.get(tb["season"], [])

    if fb["rarity"] not in [b.upper() for b in from_list]:
        trade["status"] = "rejected"
        trade["resolved_at"] = datetime.utcnow().isoformat() + "Z"
        save_trades(trades)
        return jsonify({"error": "from_user no longer has the offered badge"}), 400

    if tb["rarity"] not in [b.upper() for b in to_list]:
        trade["status"] = "rejected"
        trade["resolved_at"] = datetime.utcnow().isoformat() + "Z"
        save_trades(trades)
        return jsonify({"error": "to_user no longer has the requested badge"}), 400

    for i, b in enumerate(from_list):
        if b.upper() == fb["rarity"]:
            from_list.pop(i)
            break
    for i, b in enumerate(to_list):
        if b.upper() == tb["rarity"]:
            to_list.pop(i)
            break

    from_data.setdefault(tb["season"], []).append(tb["rarity"])
    to_data.setdefault(fb["season"], []).append(fb["rarity"])

    data[from_key] = from_data
    data[to_key] = to_data
    save_badges(data)

    # Sync trade swap to Supabase
    supabase_sync.swap_badges(
        trade["from_user"], fb["season"], fb["rarity"],
        trade["to_user"], tb["season"], tb["rarity"]
    )

    trade["status"] = "accepted"
    trade["resolved_at"] = datetime.utcnow().isoformat() + "Z"
    save_trades(trades)

    print(f"[TRADE] {trade['from_user']} <-> {trade['to_user']}: {fb['rarity']} <-> {tb['rarity']}")
    return jsonify({"ok": True, "trade": trade})

@app.route("/site/trades/<trade_id>/reject", methods=["POST"])
@require_auth
def site_reject_trade(trade_id):
    login = g.user["twitch_login"].lower()
    trades = load_trades()
    trade = next((t for t in trades if t["id"] == trade_id), None)

    if not trade:
        return jsonify({"error": "trade not found"}), 404
    if trade["to_user"].lower() != login:
        return jsonify({"error": "forbidden"}), 403
    if trade["status"] != "pending":
        return jsonify({"error": "trade is not pending"}), 400

    trade["status"] = "rejected"
    trade["resolved_at"] = datetime.utcnow().isoformat() + "Z"
    save_trades(trades)
    return jsonify({"ok": True})

@app.route("/site/trades/<trade_id>/cancel", methods=["POST"])
@require_auth
def site_cancel_trade(trade_id):
    login = g.user["twitch_login"].lower()
    trades = load_trades()
    trade = next((t for t in trades if t["id"] == trade_id), None)

    if not trade:
        return jsonify({"error": "trade not found"}), 404
    if trade["from_user"].lower() != login:
        return jsonify({"error": "forbidden"}), 403
    if trade["status"] != "pending":
        return jsonify({"error": "trade is not pending"}), 400

    trade["status"] = "cancelled"
    trade["resolved_at"] = datetime.utcnow().isoformat() + "Z"
    save_trades(trades)
    return jsonify({"ok": True})

# ── Fichiers statiques ────────────────────────────────────────

@app.route("/<path:path>")
def serve_file(path):
    return send_from_directory(".", path)

# ── Donation spin poller ───────────────────────────────────────

def generate_tts_text(username, amount_cents, viewers_db, goal_context=None):
    """Génère une phrase TTS personnalisée via Claude Haiku."""
    import anthropic as _anthropic
    api_key = os.getenv("ANTHROPIC_API_KEY", "")
    if not api_key:
        return None

    known = viewers_db.get("known_viewers", {})
    amount_euros = amount_cents // 100
    username_lower = username.lower()

    # Normaliser le username : essayer sans préfixe "elm_" si pas trouvé
    lookup_key = username_lower
    if lookup_key not in known and lookup_key.startswith("elm_"):
        lookup_key = lookup_key[4:]  # strip "elm_"

    viewer_context = ""
    display_name = username_lower.replace("elm_", "").capitalize() if username_lower.startswith("elm_") else username
    if lookup_key in known:
        v = known[lookup_key]
        display_name = v.get("prenom", display_name)
        viewer_context = f"Ce viewer s'appelle {display_name}. {v.get('traits', '')}"

    # Contexte barre de dons
    goal_line = ""
    if goal_context:
        if goal_context.get("completed"):
            goal_line = f"\nSITUATION SPÉCIALE : ce don vient de compléter l'objectif de dons ({goal_context['goal_euros']}€ atteints) ! La phrase DOIT célébrer ça en priorité, c'est le moment fort du stream."
        elif goal_context.get("pct_after") >= 75 and goal_context.get("pct_before") < 75:
            goal_line = f"\nContexte : ce don fait passer la barre à {goal_context['pct_after']:.0f}% de l'objectif ({goal_context['goal_euros']}€). Glisse-le si ça sonne bien."

    prompt = f"""Tu annonces un don sur le stream Twitch de el_matte0. Génère UNE phrase courte et naturelle.

Donateur : {display_name}
Montant : {amount_euros}€{goal_line}

RÈGLES :
- 1 phrase, 5 à 10 mots
- Mentionner le prénom ET le montant
- Ton décontracté, chaleureux
- Terminer par un remerciement court et varié : "merci", "merci à toi", "c'est cool", "on est contents", "bien joué", "sympa", "c'est stylé"
- MOTS INTERDITS : "respect", "frère", "fort", "chapeau", "généreux", "on apprécie"
- PAS de vannes, PAS de références à la personnalité — juste annoncer le don chaleureusement

EXEMPLES :
  "Abdel lâche 20 euros, merci"
  "Slash balance 50 euros, c'est stylé merci"
  "Owk envoie 30 euros, merci à toi"
  "Lucas lâche 10 euros, c'est cool"
  "Un viewer balance 15 euros, merci beaucoup"

Réponds UNIQUEMENT avec la phrase, rien d'autre."""

    try:
        client = _anthropic.Anthropic(api_key=api_key)
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=60,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text.strip()
    except Exception as e:
        print(f"[TTS_GEN] Erreur Claude: {e}")
        return None


def clean_username(raw: str) -> str:
    """Extrait la partie lisible d'un pseudo Twitch pour le TTS.

    Exemples:
        slash609      → Slash
        anoniymous_   → Anoniymous
        elm_abdel     → Abdel
        bahnkai__     → Bahnkai
        lucasledoge   → Lucasledoge
    """
    import re as _re
    name = raw.lower()
    # 1. Supprimer le préfixe elm_
    if name.startswith("elm_"):
        name = name[4:]
    # 2. Supprimer les chiffres en fin (ex: slash609 → slash)
    name = _re.sub(r'\d+$', '', name)
    # 3. Supprimer les underscores en fin (ex: anoniymous_ → anoniymous)
    name = name.rstrip('_')
    # 4. Si underscore au milieu, prendre la première partie (ex: john_doe → john)
    if '_' in name:
        name = name.split('_')[0]
    # Fallback si tout a été supprimé
    if not name:
        name = raw.lower()
    return name.capitalize()


def donation_tts_poller():
    """Génère le texte personnalisé (Claude) + audio (OpenAI TTS) pour les nouveaux dons."""
    supa_url  = os.getenv("SUPABASE_URL", "")
    supa_key  = os.getenv("SUPABASE_SERVICE_KEY", "") or os.getenv("SUPABASE_ANON_KEY", "")
    openai_key = os.getenv("OPENAI_API_KEY", "")
    if not supa_url or not supa_key:
        print("[TTS_POLL] Pas de config Supabase, poller désactivé.")
        return

    import openai as _openai
    oai_client = _openai.OpenAI(api_key=openai_key) if openai_key else None
    el_key = os.getenv("ELEVENLABS_API_KEY", "")

    viewers_db_path = os.path.join(os.path.expanduser("~"), "Desktop", "twitch-category-bot", "viewers.json")

    headers = {
        "apikey": supa_key,
        "Authorization": f"Bearer {supa_key}",
        "Content-Type": "application/json",
    }

    # Créer le bucket Supabase Storage si pas encore fait
    http_requests.post(
        f"{supa_url}/storage/v1/bucket",
        headers=headers,
        json={"id": "tts-audio", "name": "tts-audio", "public": True},
        timeout=5
    )

    while True:
        try:
            viewers_db = {}
            try:
                with open(viewers_db_path, "r", encoding="utf-8") as f:
                    viewers_db = json.load(f)
            except Exception:
                pass

            # Lire la config voix une seule fois par cycle
            cfg_r = http_requests.get(
                f"{supa_url}/rest/v1/donation_goal_config?select=openai_tts_voice,elevenlabs_voice_id&limit=1",
                headers=headers, timeout=5
            )
            chosen_voice = "onyx"
            chosen_el_voice = "TX3LPaxmHKxFdv7VOQHJ"  # Liam par défaut
            if cfg_r.ok and cfg_r.json():
                chosen_voice = cfg_r.json()[0].get("openai_tts_voice") or "onyx"
                chosen_el_voice = cfg_r.json()[0].get("elevenlabs_voice_id") or "TX3LPaxmHKxFdv7VOQHJ"

            r = http_requests.get(
                f"{supa_url}/rest/v1/donations?tts_text=is.null&select=id,username,amount_cents,message,anonymous",
                headers=headers, timeout=5
            )
            if not r.ok:
                time.sleep(1)
                continue

            # Lire la barre de dons une fois par cycle
            goal_context = None
            try:
                gcfg = http_requests.get(
                    f"{supa_url}/rest/v1/donation_goal_config?select=total_cents,goal_cents&limit=1",
                    headers=headers, timeout=5
                )
                if gcfg.ok and gcfg.json():
                    g = gcfg.json()[0]
                    total = g.get("total_cents") or 0
                    goal = g.get("goal_cents") or 0
                    goal_context = {"total": total, "goal": goal}
            except Exception:
                pass

            for don in r.json():
                amount_euros = don["amount_cents"] // 100
                known = viewers_db.get("known_viewers", {})

                # Calculer le contexte objectif pour ce don spécifique
                don_goal_ctx = None
                if goal_context and goal_context["goal"] > 0:
                    total = goal_context["total"]
                    goal = goal_context["goal"]
                    pct_before = (total - don["amount_cents"]) / goal * 100
                    pct_after = total / goal * 100
                    don_goal_ctx = {
                        "pct_before": pct_before,
                        "pct_after": min(pct_after, 100),
                        "goal_euros": goal // 100,
                        "completed": pct_before < 100 and pct_after >= 100,
                    }

                # Résoudre le prénom du donateur
                if don.get("anonymous"):
                    display_name = "Un anonyme"
                else:
                    ulow = don["username"].lower()
                    # Lookup dans viewers.json (avec/sans préfixe elm_)
                    lookup = ulow[4:] if ulow.startswith("elm_") else ulow
                    viewer_info = known.get(ulow, known.get(lookup, {}))
                    if viewer_info and viewer_info.get("prenom"):
                        display_name = viewer_info["prenom"]
                    else:
                        # Extraire la partie lisible du pseudo (sans chiffres/underscores)
                        display_name = clean_username(don["username"])

                intro = f"{display_name} a donné {amount_euros} euro{'s' if amount_euros > 1 else ''}"

                # Texte complet : toujours intro + message si présent
                message = (don.get("message") or "").strip()
                full_text = f"{intro}. {message}" if message else intro

                # Générer l'audio — ElevenLabs en priorité, OpenAI en fallback
                audio_url = None
                audio_data = None

                if el_key:
                    try:
                        el_resp = http_requests.post(
                            f"https://api.elevenlabs.io/v1/text-to-speech/{chosen_el_voice}",
                            headers={"xi-api-key": el_key, "Content-Type": "application/json"},
                            json={"text": full_text, "model_id": "eleven_multilingual_v2",
                                  "voice_settings": {"stability": 0.45, "similarity_boost": 0.75, "style": 0.3, "use_speaker_boost": True}},
                            timeout=15
                        )
                        if el_resp.status_code == 200:
                            audio_data = el_resp.content
                            print(f"[TTS_POLL] ElevenLabs OK: {don['username']}")
                        else:
                            print(f"[TTS_POLL] ElevenLabs erreur {el_resp.status_code}: {el_resp.text[:100]}")
                    except Exception as e:
                        print(f"[TTS_POLL] Erreur ElevenLabs: {e}")

                if audio_data is None and oai_client:
                    try:
                        oai_resp = oai_client.audio.speech.create(
                            model="tts-1-hd", voice=chosen_voice, input=full_text, response_format="mp3"
                        )
                        audio_data = oai_resp.content
                        print(f"[TTS_POLL] OpenAI fallback OK: {don['username']}")
                    except Exception as e:
                        print(f"[TTS_POLL] Erreur OpenAI: {e}")

                if audio_data:
                    try:
                        filename = f"{don['id']}.mp3"
                        up = http_requests.post(
                            f"{supa_url}/storage/v1/object/tts-audio/{filename}",
                            headers={"apikey": supa_key, "Authorization": f"Bearer {supa_key}", "Content-Type": "audio/mpeg"},
                            data=audio_data, timeout=15
                        )
                        if up.ok or up.status_code == 200:
                            audio_url = f"{supa_url}/storage/v1/object/public/tts-audio/{filename}"
                        else:
                            print(f"[TTS_POLL] Upload échoué {up.status_code}: {up.text[:100]}")
                    except Exception as e:
                        print(f"[TTS_POLL] Erreur upload: {e}")

                update = {"tts_text": intro}
                if audio_url:
                    update["tts_audio_url"] = audio_url

                http_requests.patch(
                    f"{supa_url}/rest/v1/donations?id=eq.{don['id']}",
                    headers={**headers, "Prefer": "return=minimal"},
                    json=update, timeout=5
                )

        except Exception as e:
            print(f"[TTS_POLL] Erreur: {e}")

        time.sleep(1)


def donation_spin_poller():
    """Poll Supabase toutes les 3s pour les dons joués non encore spinnés."""
    supa_url = os.getenv("SUPABASE_URL", "")
    supa_key  = os.getenv("SUPABASE_SERVICE_KEY", "") or os.getenv("SUPABASE_ANON_KEY", "")
    if not supa_url or not supa_key:
        print("[DONATION_POLL] Pas de config Supabase, poller désactivé.")
        return

    headers = {
        "apikey": supa_key,
        "Authorization": f"Bearer {supa_key}",
        "Content-Type": "application/json",
    }

    cents_per_spin = 500  # 5€ par défaut

    while True:
        try:
            # Lire le param configurable
            r = http_requests.get(
                f"{supa_url}/rest/v1/game_settings?key=eq.donation_cents_per_ticket&select=value",
                headers=headers, timeout=5
            )
            if r.ok and r.json():
                cents_per_spin = int(r.json()[0]["value"])

            # Chercher les dons joués et pas encore spinnés, non anonymes
            r = http_requests.get(
                f"{supa_url}/rest/v1/donations?played=eq.true&spin_queued=eq.false&anonymous=eq.false&select=id,username,amount_cents",
                headers=headers, timeout=5
            )
            if not r.ok:
                time.sleep(3)
                continue

            dons = r.json()
            for don in dons:
                n = don["amount_cents"] // cents_per_spin
                username = don["username"]
                for _ in range(n):
                    spin_queue.append(username)
                    print(f"[DONATION_SPIN] {username} +1 spin (don {don['amount_cents']}cts, total={n})")

                # Marquer spin_queued = true
                http_requests.patch(
                    f"{supa_url}/rest/v1/donations?id=eq.{don['id']}",
                    headers={**headers, "Prefer": "return=minimal"},
                    json={"spin_queued": True},
                    timeout=5
                )

        except Exception as e:
            print(f"[DONATION_POLL] Erreur: {e}")

        time.sleep(3)


# ── Lancement ─────────────────────────────────────────────────

if __name__ == "__main__":
    threading.Thread(target=donation_tts_poller, daemon=True).start()
    threading.Thread(target=donation_spin_poller, daemon=True).start()
    app.run(host="127.0.0.1", port=5000, debug=False)
