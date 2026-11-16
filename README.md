# SELF website redesign: clickable prototype

Static design-review site (Version 5 of the redesign). No backend, no build step, no secrets. All content is sample data.

## View it

- Open `index.html` in a browser (works by double-click), or
- serve the folder: `python3 -m http.server 8000` then open http://localhost:8000

## Structure

| Path | What |
|---|---|
| `index.html` | Review index linking every page |
| `V5-*.dc.html` | The 21 pages (home, discover, courses, my learning, log in, how we score, 8 courses, 7 My Learning states) |
| `support.js` | Page runtime (renders the `.dc.html` templates) |
| `demo-shell.js` | Floating "Design review" menu + "Reset demo data" |
| `assets/` | Course artwork (SVG) |

## Notes

- Login accepts any valid 10-digit mobile + any 6-digit code. Login, purchases and progress persist in the browser's localStorage (`self_v5_*`). Use "Reset demo data" to clear.
- Fonts (Outfit, Manrope) load from Google Fonts, so the first view needs internet.
- Hosting: any static host. `.nojekyll` is included for GitHub Pages.
- Known gaps inherited from the design: footer links Privacy / Terms / Refunds and "See full report" have no target pages.
