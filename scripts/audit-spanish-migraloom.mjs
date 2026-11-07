import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const base = path.join(root, 'es/migraloom');
const files = [];
const walk = dir => {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) walk(full);
    else if (item.name.endsWith('.html')) files.push(full);
  }
};
walk(base);

const errors = [];
const campaigns = new Map();
const expected = [
  'sintomas-de-migrana','migrana-con-aura','diario-de-migrana','calendario-de-migranas',
  'diario-de-cefaleas','calendario-de-cefaleas','registro-de-migranas',
  'diario-de-dolor-de-cabeza','app-para-migranas','desencadenantes-de-migrana'
];

const localTarget = raw => {
  const value = raw.split('#')[0].split('?')[0];
  if (!value || /^(https?:|mailto:|tel:|javascript:)/.test(value)) return null;
  const pathname = value.startsWith('/') ? value : `/${path.relative(root, path.resolve(path.dirname(currentFile), value))}`;
  const clean = decodeURIComponent(pathname).replace(/^\/+/, '');
  const candidate = path.join(root, clean);
  if (path.extname(candidate)) return candidate;
  return path.join(candidate, 'index.html');
};

let currentFile = '';
for (const file of files) {
  currentFile = file;
  const rel = path.relative(root, file);
  const html = fs.readFileSync(file, 'utf8');
  if (!/<html lang="es"/.test(html)) errors.push(`${rel}: falta lang=es`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${rel}: falta title`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) errors.push(`${rel}: falta meta description`);
  if (!/<link rel="canonical" href="https:\/\/kestoralabs\.com\/es\/migraloom\//.test(html)) errors.push(`${rel}: canonical incorrecta`);
  if (!html.includes('/site.js?v=20261104-analytics')) errors.push(`${rel}: falta analytics consentido`);
  if (!html.includes('/locale.js?v=20261107-3')) errors.push(`${rel}: falta selector automático de idioma`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = localTarget(match[1]);
    if (target && !fs.existsSync(target)) errors.push(`${rel}: enlace o recurso roto ${match[1]}`);
  }
  for (const match of html.matchAll(/[?&](?:amp;)?ct=([^&"]+)/g)) {
    const code = match[1];
    const where = `${rel}:${match.index}`;
    if (campaigns.has(code)) errors.push(`campaña duplicada ${code}: ${campaigns.get(code)} y ${where}`);
    campaigns.set(code, where);
  }
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const slug of ['', 'guias/', ...expected.map(item => `${item}/`), 'privacidad/', 'terminos/', 'soporte/']) {
  const url = `https://kestoralabs.com/es/migraloom/${slug}`;
  if (!sitemap.includes(`<loc>${url}</loc>`)) errors.push(`sitemap: falta ${url}`);
}

for (const slug of expected) {
  if (!fs.existsSync(path.join(base, slug, 'index.html'))) errors.push(`falta página objetivo ${slug}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Audit passed: ${files.length} Spanish MigraLoom HTML pages, ${campaigns.size} unique campaign links, all local links/assets and sitemap entries valid.`);
