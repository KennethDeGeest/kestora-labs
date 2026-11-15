import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const files = execFileSync('git', ['ls-files', '*.html'], { cwd: root, encoding: 'utf8' }).trim().split('\n').filter(Boolean);
const appIds = new Map([
  ['6770476671', 'bulkbro'], ['6805177188', 'tiphaven'], ['6811065580', 'migraloom'],
  ['6812684414', 'bumpecho'], ['6815273355', 'oqvi'], ['6824272880', 'fovri'],
  ['6828370811', 'walkbop'], ['6833412600', 'calmber']
]);

function slug(value) {
  return value.replace(/index\.html$/, '').replace(/\.html$/, '').replaceAll('/', '_').replace(/[^a-z0-9_]+/g, '_').replace(/^_+|_+$/g, '') || 'home';
}

for (const file of files) {
  const url = new URL(file, root);
  let html = await readFile(url, 'utf8');
  if (!html.includes('/analytics-consent.css')) {
    html = html.replace('</head>', '  <link rel="stylesheet" href="/analytics-consent.css?v=20261115">\n</head>');
  }
  if (!html.includes('/analytics.js')) {
    html = html.replace('</body>', '  <script src="/analytics.js?v=20261115" defer></script>\n</body>');
  }

  let linkIndex = 0;
  html = html.replace(/href="(https:\/\/apps\.apple\.com\/[^"?]+(?:\?[^"&]*?(?:&amp;[^"&]*)*)?)"/g, (match, href) => {
    const id = [...appIds.keys()].find(candidate => href.includes(`id${candidate}`));
    if (!id || /(?:\?|&amp;)ct=/.test(href)) return match;
    linkIndex += 1;
    const separator = href.includes('?') ? '&amp;' : '?';
    const token = `${appIds.get(id)}_${slug(file)}_cta_${linkIndex}`;
    return `href="${href}${separator}pt=128911414&amp;mt=8&amp;ct=${token}"`;
  });
  await writeFile(url, html);
}

console.log(`Applied shared analytics and campaign tracking to ${files.length} tracked HTML pages.`);

