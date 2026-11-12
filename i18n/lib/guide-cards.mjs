import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const decode = value => value
  .replaceAll('&amp;', '&')
  .replaceAll('&quot;', '"')
  .replaceAll('&#39;', "'")
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>');

// Card copy is snapshotted from the current overview until each linked guide
// becomes structured locale content in the next migration stage.
export async function readGuideCards(root, page) {
  const html = await readFile(join(root, page.source), 'utf8');
  return [...html.matchAll(/<a class="guide-card" href="([^"]+)"><h2>([\s\S]*?)<\/h2><p>([\s\S]*?)<\/p><span>[\s\S]*?<\/span><\/a>/g)]
    .map(match => ({ href: decode(match[1]), title: decode(match[2]), description: decode(match[3]) }));
}
