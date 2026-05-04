# Phong's Website

Static personal site for Phong Hoang, positioning him as a **Cloud Support / IT Operations Engineer**. Replaces the older Webflow creative-portfolio site at `phong-hoangs-site.webflow.io`.

## Stack

Plain HTML + CSS + minimal JS. **No build step** — `index.html` runs directly in a browser. Chosen because:

- Phong needs to maintain this himself; build tools add friction.
- Static hosts (Vercel, Netlify, GitHub Pages) accept it as-is.
- Aligns with the lane on the resume: he runs Vercel deployments end-to-end at CIRculate. This site can be deployed the same way and referenced in interviews.

## Files

- `index.html` — single-page. Sections: Hero, About, **Profile Video**, Experience, Skills, Certifications, Creative (with a "Selected projects" sub-grid of 7 cards), Contact. Inline `<head>` script sets `data-theme="dark"` before paint to prevent FOUC.
- `styles.css` — full design system as CSS variables in `:root`, with a `[data-theme="dark"]` block that overrides the palette. Light base: white + deep-navy dark sections + blue (`#2563eb`) accent. Dark base: deep navy with `#60a5fa` accent. Animations at the bottom: hero entrance stagger, photo float/glow, `.reveal` / `.reveal-stagger` scroll fades, project modal styles (image, YouTube button, chips). `prefers-reduced-motion` kills all motion.
- `script.js` — sticky-nav scroll state, mobile hamburger, theme toggle (persists to `localStorage`, follows system preference until user picks), IntersectionObserver for `.reveal`/`.reveal-stagger`, project-detail modal (`projectData` object keyed by `data-project` attribute — each entry has `tag`, `title`, `about`, `process`, `tools[]`, and optional `image` and `youtubeUrl` fields), auto-update copyright year. Self-invoking function, no dependencies.
- `assets/profile.jpg` (12 KB) — cropped headshot.
- `assets/profile-full.jpg` (76 KB) — full headshot, used in hero and as video poster.
- `assets/phong-profile.mp4` (5.6 MB) — 80-second 1920×1080 profile video. Rendered from `remotion-video/`. Do not edit manually; re-render via Remotion if changes needed.

## Profile Video (Remotion)

The video is built with **Remotion** in `remotion-video/`. It's a standalone Node project — separate from the main site's no-build-step philosophy.

- **To preview:** `cd remotion-video && npm run preview` → opens Remotion Studio in browser at localhost
- **To re-render:** `cd remotion-video && npm run render` → outputs to `remotion-video/out/phong-profile.mp4`, then copy to `assets/`
- **Scene file locations:** `remotion-video/src/scenes/` — one `.tsx` file per scene
- **Timing:** `remotion-video/src/theme.ts` — all scene start/duration frames are defined here (30fps, 2400 frames = 80s)
- **Scenes in order:** Intro → Tagline → Stats → IronEdge → CIRculate → Skills → Certs → Languages → CTA
- **Voiceover:** Drop `voiceover.mp3` into `remotion-video/public/` to add audio (slot is already wired in `ProfileVideo.tsx`)
- `remotion-video/out/` is gitignored — rendered video lives in `assets/` only

## Design intent

- Lead with **Cloud Support / IT Ops** positioning, not creative work.
- Surface the cert stack early (it's a real differentiator for the lane).
- Show experience timeline with concrete metrics (95% FCR, 200+ users, 100+ employees).
- Keep a **Creative Work** section as secondary — for design-adjacent applications, since Adobe CC is still on the resume.
- Multilingual (EN/VI/ZH/Cantonese) is highlighted as an accent card in skills — real differentiator for Houston-area roles.

## Content sources

- Resume at `..\Resume 2026\Phong_Hoang_Resume_2026.docx` is the source of truth for all factual content (job titles, dates, bullets, certs, education).
- Photos sourced from `C:\Users\woong\Desktop\Personal\Phong_ProfileImage*.jpg`.
- Old Webflow site (`phong-hoangs-site.webflow.io`) sourced the 7 creative projects. CDN images confirmed working for Cereal Box and Movie Poster. YouTube links confirmed for: Beyond The Apex, Sports Balls Store, A Can of Animated Coke, Flip Booklet Animation, Venti Air Moving Day.

## Things NOT to add

Same honesty rules as the resume:

- No Linux on skills (cert only).
- No Bash scripting on skills.
- No claims about Azure / AWS production work he hasn't done. He has Entra ID / Azure AD / Intune from IronEdge MSP — those are listed.
- Don't claim "Architected" on the CIRculate MVP — say "Built and shipped."
- Venti Air title is **Graphic Designer**. Don't reframe.

## Deployment

See `README.md`. Recommended path: push to GitHub → import to Vercel → custom domain. Builds match the resume's "GitHub + Vercel production deployment" claim.

## When making changes

- All content lives in `index.html`. Edit, save, refresh the browser.
- Color/font/spacing changes go in the `:root` block at the top of `styles.css`.
- For new sections, follow the pattern: `<section id="..." class="section">` (or `section-light` for alternating background, `section-dark` for the dark contact-style section).
- Keep the timeline order reverse-chronological (newest first).
- Mobile breakpoints: `900px` (layout collapse) and `720px` (mobile menu activates).
