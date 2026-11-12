import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
const localized = urls.filter(path => /^\/(es|fr)(\/|$)/.test(path));
const types = { app: 0, guides: 0, legal: 0, tool: 0, other: 0 };
for (const path of urls) {
  if (/\/(privacy|terms|support|health)\.html$/.test(path)) types.legal++;
  else if (path.includes('/guides/')) types.guides++;
  else if (/calculator|\/tip-out|\/tip-pool|\/tip-split|\/paycheck/.test(path)) types.tool++;
  else if (/^\/[^/]+\/$/.test(path)) types.app++;
  else types.other++;
}
console.log(JSON.stringify({ total: urls.length, localized: localized.length, types }, null, 2));
if (localized.length) {
  console.error('Disabled locale URLs found in sitemap:', localized);
  process.exitCode = 1;
}
