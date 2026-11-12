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

All eight app landing pages and all seven guide overview pages now use shared definitions. Their generated English previews match the existing pages while shared interface labels and page-specific copy remain separate from the templates.

Guide card copy is temporarily snapshotted from the current English overview pages. This prevents stale overview summaries from changing silently. The cards become structured locale content when the linked guide articles are migrated in the next stage; until then, the build deliberately blocks non-English guide overviews.

## Adding a language

The repository currently contains English only. When a new language is chosen:

1. Copy both `content/en/common.json` and `content/en/pages.json` to `content/<locale>/`.
2. Translate values only. Do not add HTML.
3. Keep URLs root-relative unless the localized route map changes them.
4. Register the locale in `config.mjs` only after its complete content set exists.
5. Run all verification commands above.
6. Compare the generated pages at phone and desktop widths.
7. Add the localized output to the live sitemap only during the explicit promotion step.

## Migration order

1. App pages — complete
2. Guide overview pages — complete
3. Guide article pages — next
4. Privacy, terms and support pages
5. Calculators and other interactive tools

English remains the visual reference throughout migration. A page is not considered migrated until its generated English version matches the existing live page.
