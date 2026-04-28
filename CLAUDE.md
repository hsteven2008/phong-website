# Phong's Website

Static personal site for Phong Hoang, positioning him as a **Cloud Support / IT Operations Engineer**. Replaces the older Webflow creative-portfolio site at `phong-hoangs-site.webflow.io`.

## Stack

Plain HTML + CSS + minimal JS. **No build step** — `index.html` runs directly in a browser. Chosen because:

- Phong needs to maintain this himself; build tools add friction.
- Static hosts (Vercel, Netlify, GitHub Pages) accept it as-is.
- Aligns with the lane on the resume: he runs Vercel deployments end-to-end at CIRculate. This site can be deployed the same way and referenced in interviews.

## Files

- `index.html` — single-page. Sections: Hero, About, Experience, Skills, Certifications, Creative, Contact.
- `styles.css` — full design system as CSS variables in `:root`. Modern professional palette: white base, deep navy for dark sections, blue (`#2563eb`) accent.
- `script.js` — sticky-nav scroll state, mobile hamburger, auto-update copyright year. Self-invoking function, no dependencies.
- `assets/profile.jpg` (12 KB) — cropped headshot.
- `assets/profile-full.jpg` (76 KB) — full headshot, used in hero.

## Design intent

- Lead with **Cloud Support / IT Ops** positioning, not creative work.
- Surface the cert stack early (it's a real differentiator for the lane).
- Show experience timeline with concrete metrics (95% FCR, 200+ users, 100+ employees).
- Keep a **Creative Work** section as secondary — for design-adjacent applications, since Adobe CC is still on the resume.
- Multilingual (EN/VI/ZH/Cantonese) is highlighted as an accent card in skills — real differentiator for Houston-area roles.

## Content sources

- Resume at `..\Resume 2026\Phong_Hoang_Resume_2026.docx` is the source of truth for all factual content (job titles, dates, bullets, certs, education).
- Photos sourced from `C:\Users\woong\Desktop\Personal\Phong_ProfileImage*.jpg`.
- Old Webflow site informed the section structure (About / Projects / Contact pattern) but content was rewritten for the new lane.

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
