import { invariant } from '../i18n/lib/core.mjs';

function translateString(value, translations, path) {
  const trimmed = value.trim();
  if (!trimmed) return value;
  const translated = translations.strings[trimmed];
  if (translated !== undefined) return value.replace(trimmed, translated);
  const punctuation = trimmed.match(/^([.,;:])\s+(.+)$/s);
  if (punctuation && translations.strings[punctuation[2]] !== undefined) {
    return value.replace(trimmed, `${punctuation[1]} ${translations.strings[punctuation[2]]}`);
  }
  if (translations.preserve.has(trimmed)) return value;
  throw new Error(`Missing legal translation for ${path}: ${JSON.stringify(trimmed)}`);
}

function translateNodes(nodes, translations, path) {
  return nodes.map((node, index) => {
    if (typeof node === 'string') return translateString(node, translations, `${path}[${index}]`);
    const translated = structuredClone(node);
    if (typeof translated.attrs?.['aria-label'] === 'string') {
      translated.attrs['aria-label'] = translateString(translated.attrs['aria-label'], translations, `${path}[${index}].attrs.aria-label`);
    }
    translated.children = translateNodes(translated.children, translations, `${path}[${index}].children`);
    return translated;
  });
}

export function localizeLegalPages(source, overlay, locale) {
  invariant(overlay && overlay.locale === locale, `Legal overlay must target ${locale}`);
  invariant(overlay.shared && overlay.pages, `${locale} legal overlay is incomplete`);
  const sharedPreserve = new Set(overlay.shared.preserve ?? []);
  const result = { pages: {} };
  for (const [pageId, pageOverlay] of Object.entries(overlay.pages)) {
    const sourcePage = source.pages[pageId];
    invariant(sourcePage, `Unknown legal page in ${locale} overlay: ${pageId}`);
    const strings = { ...overlay.shared.strings, ...pageOverlay.strings };
    const preserve = new Set([...sharedPreserve, ...(pageOverlay.preserve ?? [])]);
    const translations = { strings, preserve };
    const localized = structuredClone(sourcePage);
    localized.meta.title = pageOverlay.title;
    localized.meta.tags = localized.meta.tags.map((tag, index) => {
      if (tag.name === 'description') return { ...tag, content: translateString(tag.content, translations, `${pageId}.meta.tags[${index}].content`) };
      return tag;
    });
    localized.body = translateNodes(localized.body, translations, `${pageId}.body`);
    result.pages[pageId] = localized;
  }
  return result;
}
