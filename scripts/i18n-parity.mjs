import { readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages, site } from '../i18n/config.mjs';
import { outputPath } from '../i18n/lib/core.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function decode(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&nbsp;', ' ');
}

function bodyText(html) {
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
  return decode(body
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim());
}

function classSet(html) {
  return [...new Set([...html.matchAll(/class="([^"]+)"/g)].flatMap(match => match[1].split(/\s+/)))].sort();
}

function urls(html, attribute, base) {
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
  return [...body.matchAll(new RegExp(`${attribute}="([^"]+)"`, 'g'))]
    .map(match => match[1])
    .filter(value => !value.startsWith('data:'))
    .map(value => {
      const url = new URL(value, base);
      url.search = '';
      url.hash = '';
      return url.href;
    })
    .sort();
}

for (const page of pages) {
  const source = await readFile(join(root, page.source), 'utf8');
  const generated = await readFile(join(root, site.previewDirectory, outputPath('en', page.route)), 'utf8');
  const base = `${site.origin}${page.route}`;
  const checks = {
    visibleText: [bodyText(source), bodyText(generated)],
    classes: [classSet(source), classSet(generated)],
    links: [urls(source, 'href', base).filter(url => !url.includes('/site.css')), urls(generated, 'href', base).filter(url => !url.includes('/site.css'))],
    images: [urls(source, 'src', base), urls(generated, 'src', base)]
  };
  for (const [name, [expected, actual]] of Object.entries(checks)) {
    if (JSON.stringify(expected) !== JSON.stringify(actual)) {
      console.error(`Parity failure for ${page.id}: ${name}`);
      console.error(JSON.stringify({ expected, actual }, null, 2));
      process.exitCode = 1;
    }
  }
}

if (!process.exitCode) console.log(`Parity verified for ${pages.length} migrated English page(s).`);
