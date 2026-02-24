# SOC_OPS — Security Operations Portfolio

A dark-themed, cyber-ops inspired portfolio site showcasing SOC projects including SIEM detection engineering and incident response playbooks.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

## 📦 Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder.

## 🌐 Deploy to Vercel (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
3. Click **"Add New Project"** → Import this repo
4. Vercel auto-detects Vite — just click **Deploy**
5. Done! Your site is live.

## 🌐 Deploy to Netlify

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → Sign in with GitHub
3. Click **"Add new site"** → Import from GitHub
4. Set:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click Deploy

## 🌐 Deploy to GitHub Pages

```bash
# Install gh-pages
npm install gh-pages --save-dev
```

Add to `package.json` scripts:
```json
"deploy": "npm run build && gh-pages -d dist"
```

Add to `vite.config.js`:
```js
base: '/soc-portfolio/',  // your repo name
```

Then run:
```bash
npm run deploy
```

## ✏️ Customization

Edit `src/App.jsx`:

- **Projects** — Update the `projects` array at the top of the file
- **Your Name** — Search for `[Your Name]` in the About section
- **Links** — Update LinkedIn, GitHub, Resume, and Email links in the About section
- **Stats** — Update the `stats` array in the `StatsBar` component

## 🛠 Tech Stack

- React 18
- Vite 6
- Vanilla CSS (no framework)
- Google Fonts (JetBrains Mono, Space Grotesk, IBM Plex Sans)
