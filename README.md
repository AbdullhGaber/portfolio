# Abdullh Gaber — Portfolio

A responsive, single-page portfolio site with a light/dark "Android Neon Green" theme,
built with vanilla HTML, CSS and JavaScript (no build step, no dependencies).

## 🚀 Deploy to GitHub Pages (free hosting)

1. Create a new **public** repository on GitHub, e.g. `abdullh-gaber.github.io` (for a
   root domain) or any name like `portfolio` (for a project page).
2. Push these files to the repository root:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Under **Branch**, choose `main` and `/ (root)`, then **Save**.
6. Wait ~1 minute — your site will be live at:
   - `https://<your-username>.github.io/` (if the repo is named `<your-username>.github.io`), or
   - `https://<your-username>.github.io/<repo-name>/` (for any other repo name).

## 📁 Project structure

```
├── index.html              # all page content/markup
├── css/
│   ├── base.css            # design tokens (colors, type, resets)
│   └── components.css      # nav, hero, cards, timeline, etc.
├── js/
│   └── main.js             # theme toggle, scroll reveals, filters, nav state
└── assets/
    ├── favicon.svg
    ├── images/profile.jpg
    └── resume/Abdullh_Gaber_Resume.pdf
```

## 🎨 Customizing the theme

All colors, fonts and spacing live in `css/base.css` under `:root` (dark theme) and
`[data-theme="light"]` (light theme) — change `--neon-h` / `--neon` there to shift the
accent color, or the `--font-*` variables to swap typefaces.

## 🧩 Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Uses CSS `color-mix()`,
`backdrop-filter`, and `IntersectionObserver` — all widely supported since 2022+.
