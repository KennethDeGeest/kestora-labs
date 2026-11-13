# Kestora Labs localization pipeline

This directory is the guarded source for future translations. It does **not** publish localized pages or replace the current English HTML.

## Safety model

- Templates own HTML, CSS classes, scripts and layout.
- Locale files contain plain text, URLs and structured lists only.
- HTML and template tokens are rejected inside translation strings.
- A locale must be explicitly enabled in `config.mjs`.
- Every enabled locale must contain every registered page and field.
- Core pages are mandatory in every enabled locale; SEO pages declare exactly which locales they belong to.
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

All eight app landing pages, all seven guide overview pages, all 55 editorial guide articles, all five interactive tools and all 26 legal/support pages now use shared definitions. Their generated English previews match the existing pages while shared interface labels and page-specific copy remain separate from the templates.

Guide cards, article metadata, structured data and article content are stored as validated locale content. Article markup is represented as a restricted element tree: translators can change text without introducing scripts, new HTML structures or unsafe URLs.

Interactive tools use a separate restricted tree. Their calculator scripts, stylesheets, form structure and protected attributes must remain identical to English, while visible text and accessible labels can be translated.

Legal and support pages use the same guarded document renderer. Their shared layout, navigation, cookie controls, styles and scripts are locked to the English structure, while visible copy and accessible labels can be translated.

## Adding a language

The repository currently contains English only. When a new language is chosen:

1. Copy the JSON files in `content/en/` to `content/<locale>/`.
2. Translate values only. Do not add HTML.
3. Keep URLs root-relative unless the localized route map changes them.
4. Register the locale in `config.mjs` only after its complete content set exists.
5. Run all verification commands above.
6. Compare the generated pages at phone and desktop widths.
7. Add the localized output to the live sitemap only during the explicit promotion step.

## Core pages and language-specific SEO

Every registered page has a `scope`:

- `core` pages belong to every enabled language. This includes app landing pages, guide overview pages, privacy pages, terms pages and support pages.
- `seo` pages list their supported locales explicitly. English guides and calculators are currently English-only. A Dutch SEO page will be registered for `nl` only after Dutch keyword research determines its subject, native-language URL and content.

The Dutch locale is registered at `/nl/` but remains disabled until all mandatory Dutch core content has been translated, reviewed and verified. Its homepage, shared interface, app landing pages, empty guide hubs, all eight support pages and the first four app privacy policies are drafted. The remaining privacy, terms and health content is still pending. Enabling Dutch therefore cannot accidentally publish an incomplete site or English SEO articles beneath Dutch URLs.

## Migration order

1. App pages — complete
2. Guide overview pages — complete
3. Guide article pages — complete
4. Calculators and other interactive tools — complete
5. Privacy, terms and support pages — complete

English remains the visual reference throughout migration. A page is not considered migrated until its generated English version matches the existing live page.
