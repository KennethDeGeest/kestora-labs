import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const files = [
  'bulkbro/guides/editorial-policy/index.html',
  'fovri/guides/best-recipe-app/index.html',
  'fovri/guides/best-recipe-keeper-app/index.html',
  'fovri/guides/best-recipe-organizer-app/index.html',
  'fovri/guides/cookbook-app/index.html',
  'fovri/guides/digital-recipe-book/index.html',
  'fovri/guides/meal-planning-app-with-grocery-list/index.html',
  'fovri/guides/recipe-app-for-iphone/index.html',
  'fovri/guides/recipe-manager-app/index.html',
  'fovri/guides/save-recipes-from-instagram/index.html',
  'fovri/guides/save-recipes-from-tiktok/index.html'
];

for (const file of files) {
  const url = new URL(file, root);
  let html = await readFile(url, 'utf8');
  if (html.includes('"@type":"BreadcrumbList"')) continue;
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]?.split('|')[0]?.trim();
  const appSlug = file.split('/')[0];
  const appName = appSlug === 'bulkbro' ? 'BulkBro' : 'Fovri';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Kestora Labs', item: 'https://kestoralabs.com/' },
      { '@type': 'ListItem', position: 2, name: appName, item: `https://kestoralabs.com/${appSlug}/` },
      { '@type': 'ListItem', position: 3, name: 'Guides', item: `https://kestoralabs.com/${appSlug}/guides/` },
      { '@type': 'ListItem', position: 4, name: title, item: canonical }
    ]
  };
  html = html.replace('</head>', `  <script type="application/ld+json">${JSON.stringify(data)}</script>\n</head>`);
  await writeFile(url, html);
}

console.log(`Checked breadcrumbs for ${files.length} guides.`);

