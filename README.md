# Phong Hoang — Personal Site

Static personal site for Phong Hoang, Cloud Support / IT Operations Engineer.

## Stack

Plain HTML, CSS, and a few lines of JavaScript. No build step. Open `index.html` in a browser to preview.

## Files

- `index.html` — single-page site, all sections (Hero, About, Experience, Skills, Certifications, Creative, Contact).
- `styles.css` — full styling with a CSS variable design system. Modern professional palette.
- `script.js` — sticky-nav scroll state, mobile menu, auto-update copyright year.
- `assets/profile.jpg` — cropped headshot for navbar/about.
- `assets/profile-full.jpg` — full headshot for hero.

## Local preview

Just double-click `index.html` and it opens in your default browser. No server needed.

If you want a local server (e.g., for testing relative paths or to avoid `file://` quirks):

```powershell
# Python (if installed)
python -m http.server 8000

# Node http-server (if installed globally)
npx http-server -p 8000

# VS Code: install the "Live Server" extension and right-click index.html → "Open with Live Server"
```

Then visit `http://localhost:8000`.

## Deploy

This site has no build step, so any static host works.

### Vercel (recommended — already in your stack)

1. Push this folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com), click "New Project", import the repo.
3. Framework preset: **Other** (or "No Framework"). Output directory: `.` (root).
4. Click Deploy. You'll get a `*.vercel.app` URL in ~30 seconds.
5. Add a custom domain (e.g., `phonghoang.com`) under Project → Settings → Domains.

### Netlify

1. Push to GitHub.
2. [netlify.com](https://netlify.com) → "Add new site" → "Import an existing project" → connect repo.
3. Build command: leave empty. Publish directory: `.` (root).
4. Deploy.

### GitHub Pages

1. Push to GitHub on the `main` branch.
2. Repo → Settings → Pages → Source: `Deploy from a branch`, branch `main`, folder `/ (root)`.
3. Save. Site goes live at `https://<username>.github.io/<repo>/` in ~1 minute.

## Editing content

All content is in `index.html`. Sections are clearly labeled with HTML comments (`<!-- HERO -->`, `<!-- ABOUT -->`, etc.). Edit text directly, save, refresh the browser.

To swap the photo: replace `assets/profile-full.jpg` (and `assets/profile.jpg` if used) with a new file at the same path. Keep aspect ratio close to 1:1 for the hero frame.

## Updating the design

Color palette and spacing live as CSS variables at the top of `styles.css` (`:root { ... }`). Change `--accent` to retune the entire site's accent color in one line. Same for fonts, radii, shadows.
