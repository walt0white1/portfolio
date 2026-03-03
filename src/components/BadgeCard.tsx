import { useRef, useCallback, useState } from "react";
import { RARITY_COLORS, RARITY_POINTS } from "../types";

/* Per-rarity holographic color sets */
const HOLO_COLORS: Record<string, { c1: string; c2: string; c3: string }> = {
  COMMON:    { c1: "#b0b0b0", c2: "#707070", c3: "#d4d4d4" },
  RARE:      { c1: "#4da6ff", c2: "#0066cc", c3: "#51d6fd" },
  EPIC:      { c1: "#b266ff", c2: "#7b2fbe", c3: "#d9a3ff" },
  LEGENDARY: { c1: "#ffd633", c2: "#cc8800", c3: "#ffeb8a" },
  UNIQUE:    { c1: "#ff66cc", c2: "#e11d48", c3: "#ff99dd" },
};

interface Props {
  rarity: string;
  count: number;
  onClick?: () => void;
  selected?: boolean;
}

export default function BadgeCard({ rarity, count, onClick, selected }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const key = rarity.toUpperCase();
  const holo = HOLO_COLORS[key] || HOLO_COLORS.COMMON;
  const color = RARITY_COLORS[key] || RARITY_COLORS.COMMON;
  const pts = RARITY_POINTS[key] || 0;
  const empty = count === 0;

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const card = cardRef.current;
    if (!card || empty) return;
    const rect = card.getBoundingClientRect();
    const hw = rect.width / 2;
    const hh = rect.height / 2;
    const ratioX = (e.clientX - (rect.x + hw)) / hw;
    const ratioY = (e.clientY - (rect.y + hh)) / hh;
    card.style.setProperty("--holo-x", String(ratioX));
    card.style.setProperty("--holo-y", String(ratioY));
  }, [empty]);

  const handlePointerEnter = useCallback(() => {
    setIsHovering(true);
    const card = cardRef.current;
    if (card) card.classList.remove("idle-shimmer");
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovering(false);
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--holo-x", "0");
    card.style.setProperty("--holo-y", "0");
    if (!empty) card.classList.add("idle-shimmer");
  }, [empty]);

  const classes = [
    "holo-card",
    empty && "is-empty",
    selected && "is-selected",
    !isHovering && !empty && "idle-shimmer",
  ].filter(Boolean).join(" ");

  return (
    <div
      ref={cardRef}
      className={classes}
      style={{
        "--c1": holo.c1,
        "--c2": holo.c2,
        "--c3": holo.c3,
        "--c1-40": holo.c1 + "66",
        "--card-bg": `linear-gradient(145deg, ${holo.c2}15 0%, ${holo.c1}08 50%, ${holo.c2}15 100%)`,
        "--card-border": `${holo.c1}30`,
        "--card-glow": `${holo.c1}50`,
      } as React.CSSProperties}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {/* Holographic layers */}
      <div className="holo-bg" />
      <div className="holo-lines" />
      <div className="holo-circles" />

      {/* Card content */}
      <div className="card-inner">
        <span className="card-rarity" style={{ color }}>
          {key}
        </span>

        <span className="card-count">
          {empty ? "—" : count}
        </span>

        <span className="card-pts">
          {pts} pt{pts > 1 ? "s" : ""} / badge
        </span>
      </div>
    </div>
  );
}
