# Kestora Labs website templates

There is one supported portfolio-page system. Older app-specific landing-page and legal-page templates have been removed.

## Source of truth

- Portfolio home and every app page: `/site.css`
- Privacy, Terms, Support and Health pages: `/legal-page.css`
- App-page structure: any current `/<app>/index.html`
- Legal-page generator: `/scripts/build-legal-pages.mjs`
- Template enforcement: `/scripts/check-current-templates.mjs`

## Adding an app

1. Pull the latest `main` branch before making changes.
2. Copy a current app page such as `/bumpecho/index.html`.
3. Change only the app-specific metadata, text, icon, screenshots, links and legal notice.
4. Keep the shared `/site.css` reference and all required structural classes.
5. Add exactly three real app screenshots using `app-showcase`, `screenshot-track` and `screenshot-card`.
6. Add the app to `scripts/build-legal-pages.mjs` and generate its legal pages with the shared legal template.
7. Run `node scripts/check-current-templates.mjs` before publishing.

Do not create an app-specific `styles.css`, `legal.css`, landing-page theme, or compatibility adapter. Product-specific guide and calculator styles are separate content systems and are not app-page templates.
