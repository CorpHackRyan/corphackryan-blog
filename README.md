# CorpHackRyan Blog

Personal blog for documenting projects, experiments, notes, and whatever else I am exploring.

## Stack

- HTML
- CSS
- Vanilla JavaScript
- GitHub Pages for deployment

## Project Structure

- `index.html` - main landing page
- `assets/styles/styles.css` - global styles
- `assets/scripts/app.js` - UI behavior (theme, filtering, search, copy links, shortcuts)
- `assets/images/` - icons and media assets
- `posts/` - standalone post pages
- `posts/legacy/` - legacy entries split into individual pages
- `posts/changelog.html` - site changelog page
- `robots.txt` - crawler directives
- `sitemap.xml` - page index for search engines

## Current Features

- Dark mode toggle (defaults on, persisted)
- Legacy post toggle (defaults on, persisted)
- Search + tag filters for latest articles
- Random post button and keyboard shortcut (`r`)
- Search focus keyboard shortcut (`/`)
- Copy-link buttons on post cards + post pages
- Responsive layout for desktop and mobile

## Run Locally

Any static server works. Example options:

```bash
# Python 3
python3 -m http.server 8080
```

Then open:

- `http://localhost:8080/`

## Deploy (GitHub Pages)

1. Push to your configured Pages branch.
2. Ensure Pages source is set to the correct branch/folder.
3. Confirm site URL matches paths in `sitemap.xml` and `robots.txt`.
4. Hard-refresh after deploy to avoid stale CSS/JS cache.

## Update Workflow

1. Add/edit posts under `posts/` (or `posts/legacy/` for archive).
2. Update article cards in `index.html` if needed.
3. If new public pages are added, include them in `sitemap.xml`.
4. Add notable site changes to `posts/changelog.html`.

## Notes

- Asset/file names are case-sensitive on GitHub Pages.
- Use relative paths consistently for static hosting.
