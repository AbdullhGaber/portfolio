# Abdullh Gaber — Portfolio

A responsive, single-page portfolio site with a light/dark "Android Neon Green" theme,
built with vanilla HTML, CSS and JavaScript (no build step, no dependencies).


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
