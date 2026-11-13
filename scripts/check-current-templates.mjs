import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apps = ['walkbop', 'fovri', 'bulkbro', 'tiphaven', 'oqvi', 'migraloom', 'bumpecho', 'calmber'];
const legalPages = ['privacy.html', 'terms.html', 'support.html'];
const styleVersion = '20261113-language-menu';
const forbiddenTemplateFiles = [
  'legal-template.css',
  'legal-template.js',
  ...apps.flatMap(app => [`${app}/styles.css`, `${app}/legal.css`]),
  'bumpecho/seo.css',
  'migraloom/seo.css',
  'oqvi/seo.css',
  'fovri/guide.css'
];
const failures = [];
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const requireText = (relative, html, value) => {
  if (!html.includes(value)) failures.push(`${relative}: missing ${value}`);
};

for (const app of apps) {
  const relative = `${app}/index.html`;
  const html = read(relative);
  requireText(relative, html, `/site.css?v=${styleVersion}`);
  requireText(relative, html, 'class="app-page-body"');
  requireText(relative, html, 'class="app-page-shell"');
  requireText(relative, html, 'class="app-showcase"');
  requireText(relative, html, 'class="screenshot-track"');
  requireText(relative, html, 'class="app-case-details"');
  requireText(relative, html, 'class="app-page-bottom-cta"');
  requireText(relative, html, 'class="app-case-footer"');
  const screenshotCount = (html.match(/class="screenshot-card"/g) || []).length;
  if (screenshotCount !== 3) failures.push(`${relative}: expected 3 screenshot cards, found ${screenshotCount}`);

  for (const page of legalPages) {
    const legalRelative = `${app}/${page}`;
    const legal = read(legalRelative);
    requireText(legalRelative, legal, `/legal-page.css?v=${styleVersion}`);
    requireText(legalRelative, legal, 'class="legal-main"');
    requireText(legalRelative, legal, 'class="legal-tools"');
    requireText(legalRelative, legal, 'class="legal-shell"');
    requireText(legalRelative, legal, 'class="legal-content"');
  }
}

const bulkHealth = read('bulkbro/health.html');
requireText('bulkbro/health.html', bulkHealth, `/legal-page.css?v=${styleVersion}`);
requireText('bulkbro/health.html', bulkHealth, 'class="legal-shell"');

for (const relative of forbiddenTemplateFiles) {
  if (fs.existsSync(path.join(root, relative))) failures.push(`${relative}: obsolete template file still exists`);
}

if (failures.length) {
  console.error(`Template check failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log(`Template check passed: ${apps.length} app pages and ${apps.length * legalPages.length + 1} legal pages use the current shared system.`);
