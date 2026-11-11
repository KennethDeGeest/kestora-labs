import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tools = [
  { slug: 'paycheck-calculator-with-tips', brokenLocale: '/es/tiphaven/calculadora-nomina-con-propinas/' },
  { slug: 'tip-out-calculator' },
  { slug: 'tip-pool-calculator', brokenLocale: '/es/tiphaven/calculadora-bote-propinas/' },
  { slug: 'tip-split-calculator', brokenLocale: '/es/tiphaven/calculadora-dividir-propinas/' },
];
const oldLink = '<link rel="stylesheet" href="/mobile-audit.css?v=20261110k">';
const newLink = `${oldLink}<link rel="stylesheet" href="/guide-tool.css?v=20261111-2">`;

for (const { slug, brokenLocale } of tools) {
  const file = path.join(root, 'tiphaven', slug, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes(oldLink)) throw new Error(`Missing mobile stylesheet marker in ${slug}`);
  if (!html.includes('/guide-tool.css')) html = html.replace(oldLink, newLink);
  html = html.replace('/guide-tool.css?v=20261111-1', '/guide-tool.css?v=20261111-2');
  if (!html.includes('../calculator-currency.js')) {
    html = html.replace(/(<script src="calculator\.js[^>]*><\/script>)/, '<script src="../calculator-currency.js?v=20261111-1" defer></script>$1');
  }
  html = html.replace('/calculator-currency.js?v=20261111-1', '/calculator-currency.js?v=20261111-2');
  html = html.replace(/calculator\.js\?v=[^"]+/, 'calculator.js?v=20261111-currency');
  if (brokenLocale) {
    const localeLink = new RegExp(`<a href="${brokenLocale}" lang="es" hreflang="es" data-locale="es">Español<\\/a>`, 'g');
    html = html.replace(localeLink, '');
    html = html.replace(`<link rel="alternate" hreflang="es" href="https://kestoralabs.com${brokenLocale}">`, '');
  }
  fs.writeFileSync(file, html);
  console.log(`${slug}: shared tool style added`);
}
