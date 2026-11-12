# Kestora Labs localization pipeline

This directory is the guarded source for future translations. It does **not** publish localized pages or replace the current English HTML.

## Safety model

- Templates own HTML, CSS classes, scripts and layout.
- Locale files contain plain text, URLs and structured lists only.
- HTML and template tokens are rejected inside translation strings.
- A locale must be explicitly enabled in `config.mjs`.
- Every enabled locale must contain every registered page and field.
- Canonical URLs and `hreflang` links are generated, never translated manually.
- Output always goes to `.i18n-preview/`, which is ignored by Git.
- The live sitemap is unchanged until a locale is complete and deliberately promoted.

## Commands

```sh
npm run i18n:inventory
npm run i18n:check
npm test
npm run i18n:build
npm run i18n:parity
```

`npm run i18n:verify` runs the complete sequence. Parity verification compares visible text, CSS classes, links and image sources between each migrated English page and its generated equivalent.

The GitHub workflow `Localization safety checks` runs this verification automatically whenever localization infrastructure, content or the sitemap changes.

The first pilot is the Fovri app page. It proves that the current shared portfolio template can be rendered entirely from content data while retaining the existing CSS and page structure.

## Adding a language

1. Copy `content/en/pages.json` to `content/<locale>/pages.json`.
2. Translate values only. Do not add HTML.
3. Keep URLs root-relative unless the localized route map changes them.
4. Run all four commands above.
5. Compare the generated pages at phone and desktop widths.
6. Enable the locale only after all registered pages are complete.
7. Add the localized output to the live sitemap only during the explicit promotion step.

## Migration order

1. App pages
2. Guide overview pages
3. Guide article pages
4. Privacy, terms and support pages
5. Calculators and other interactive tools

English remains the visual reference throughout migration. A page is not considered migrated until its generated English version matches the existing live page.
