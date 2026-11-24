# Porchlight — GitHub Pages pilot release

This package is intended for a limited hosted pilot and Accommodations-team accessibility review, **not yet public promotion**.

## Deploy
1. Create a GitHub repository (e.g., `porchlight`).
2. Upload the **contents of this folder**, not the enclosing folder: `index.html`, `assessment.html`, `discover.html`, `saved.html`, `about.html`, and the `css`, `js`, `data`, and `images` folders.
3. Commit to the `main` branch.
4. Under **Settings → Pages**, choose **Deploy from a branch**, `main`, `/ (root)`, then Save.
5. Wait for the Pages deployment and open the resulting website.
6. Share the hosted URL privately with your Accommodations team for real keyboard and screen-reader review.

## Notes
- No user accounts or backend. Interest codes and saved opportunities stay in the browser's local storage.
- Volunteer openings, locations, eligibility and schedules may change; users should confirm on the organization's site.
- The accompanying URL verification register and internal audit notes are **not part of the public site**.
- Some external URLs still need confirmation in an ordinary browser. This is a pilot release, not an accessibility-certified public launch.

## Getting Started guide update
- New `getting-started.html` page with five introductory steps, an expandable questions list, and links into discovery and assessment.
- Home page and About page link to the guide.
- Updated `css/styles.css` styles the guide and invitation.
- This package also retains the corrected About & Privacy wording.

## PWA support (November 2026)
- Includes `manifest.webmanifest`, `service-worker.js`, `js/pwa.js`, and app icons under `images/`.
- Works on GitHub Pages over HTTPS. `file://` local preview does not register a service worker.
- Network-first caching prefers fresh site files and falls back to previously cached files offline.
- The cache version is `porchlight-site-20261124-expansion1-r2`. Increment this string whenever releasing a future change to the pre-cached file list or behavior.
- A first online visit is required to cache the site; external organization links are not cached.
- After deployment, test installation on a real device, offline browsing, and updates after reconnecting.
- Install guidance appears under About & Privacy; the home page links to it.

## Icon compatibility correction
Added a dedicated 180×180 Apple touch icon, a small browser favicon, and versioned icon references to prompt browsers to refresh their cached icons. After deployment, remove the existing Porchlight home-screen shortcut/app, open the updated site in Safari/Chrome, and add it again. On iPhone use Safari → Share → Add to Home Screen; if an Edit Name and Icon option appears, confirm the lantern preview.

Future releases: change version in data/version.json, js/pwa.js and service-worker.js, and bump CACHE_NAME. Publish together. Update confirmation requires the target controlling worker. Assessment page refresh is deferred.
