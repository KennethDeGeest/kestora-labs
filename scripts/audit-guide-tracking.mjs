import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { pages } from '../i18n/config.mjs';

const root = new URL('../', import.meta.url);
const sitemap = await readFile(new URL('sitemap.xml', root), 'utf8');
const files = pages
  .filter(page => page.type === 'guide-article')
  .map(page => `${page.route.replace(/^\//, '').replace(/\/$/, '')}/index.html`);
const allHtml = execFileSync('git', ['ls-files', '*.html'], { cwd: root, encoding: 'utf8' }).trim().split('\n').filter(Boolean);
const appIds = ['6770476671','6805177188','6811065580','6812684414','6815273355','6824272880','6828370811','6833412600'];
const errors = [];
const campaigns = new Map();

for (const file of allHtml) {
  const html = await readFile(new URL(file, root), 'utf8');
  if (!html.includes('/analytics.js')) errors.push(`${file}: missing analytics script`);
  if (!html.includes('/analytics-consent.css')) errors.push(`${file}: missing consent styling`);
  for (const match of html.matchAll(/href="(https:\/\/apps\.apple\.com\/[^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (!appIds.some(id => href.includes(`id${id}`))) continue;
    const token = new URL(href).searchParams.get('ct');
    if (!token) errors.push(`${file}: Kestora App Store link has no campaign token`);
    else {
      const used = campaigns.get(token) || [];
      used.push(file);
      campaigns.set(token, used);
    }
  }
}

for (const file of files) {
  const html = await readFile(new URL(file, root), 'utf8');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const checks = [
    [canonical, 'canonical'],
    [/<meta name="description"/.test(html), 'meta description'],
    [/<meta name="robots" content="index,follow/.test(html), 'indexable robots'],
    [file.endsWith('/editorial-policy/index.html') || html.includes('"@type":"Article"'), 'Article structured data'],
    [html.includes('"@type":"BreadcrumbList"'), 'breadcrumb structured data'],
    [html.includes('/analytics.js'), 'analytics script'],
    [html.includes('/analytics-consent.css'), 'consent styling'],
    [canonical && sitemap.includes(`<loc>${canonical}</loc>`), 'sitemap entry']
  ];
  for (const [ok, label] of checks) if (!ok) errors.push(`${file}: missing ${label}`);

}

for (const [token, used] of campaigns) {
  if (used.length > 1) errors.push(`duplicate campaign token ${token}: ${used.join(', ')}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Audit passed: ${files.length} registered guides, ${allHtml.length} tracked pages, ${campaigns.size} unique App Store campaign links.`);
