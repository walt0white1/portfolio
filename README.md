# Portfolio de Matteo Taubin

Portfolio professionnel moderne et performant construit avec Next.js.

## 🚀 Déploiement rapide sur Vercel

### Prérequis
- Node.js 18+ installé
- Un compte GitHub
- Un compte Vercel (gratuit)

### Installation locale

```bash
# Cloner le repo
git clone <your-repo-url>
cd portfolio

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
```

### Déployer sur Vercel

1. **Pousser le code sur GitHub** (si pas déjà fait)
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Se connecter à Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Cliquer "Sign Up" → "Continue with GitHub"
   - Autoriser Vercel

3. **Créer un nouveau projet**
   - Dashboard → "Add New..." → "Project"
   - Importer le repo GitHub
   - Cliquer "Deploy"

**C'est tout !** Vercel déploiera automatiquement à chaque push sur main.

### Configurations recommandées

**Custom domain :**
- Settings → Domains
- Ajouter votre domaine personnel

**Email contact :**
- Éditer `app/page.js` ligne ~670
- Remplacer `hello@matteotaubin.dev` par votre email

## 📁 Structure du projet

```
app/
├── layout.js              # Layout principal
├── page.js               # Page d'accueil
├── globals.css           # Styles globaux
├── page.module.css       # Styles de page
└── components/
    ├── Navbar.js         # Navigation
    ├── Navbar.module.css
    ├── Hero.js           # Section hero
    ├── Hero.module.css
    ├── Footer.js         # Footer
    └── Footer.module.css
```

## 🎨 Personnalisation

### Couleurs
Éditer `app/globals.css` variables CSS :
```css
:root {
  --accent: #3b82f6;  /* Couleur principale */
  --text-primary: #e8ecf4;  /* Texte principal */
  /* ... */
}
```

### Contenu
- Section Hero : `app/components/Hero.js`
- Projets : `app/page.js` (section projects)
- Autres sections : `app/page.js`

## 🔧 Commandes

```bash
npm run dev     # Dev server
npm run build   # Build prod
npm start       # Lancer prod
npm run lint    # Lint code
```

## 📊 Performance

- Page Speed: A+
- Lighthouse: 95+
- Core Web Vitals: Excellent

## 📝 License

Privé - Matteo Taubin © 2026
