import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { loadContent, migrationSummary } from './i18n-shared.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const content = await loadContent(root);
console.log(JSON.stringify({ ok: true, ...migrationSummary(content) }, null, 2));
