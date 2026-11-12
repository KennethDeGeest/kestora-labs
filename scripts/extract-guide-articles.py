import json
import re
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse

ROOT = Path(__file__).resolve().parent.parent
GUIDE_APPS = ['bulkbro', 'bumpecho', 'fovri', 'migraloom', 'oqvi']
SKIP = {('bulkbro', 'how-fast-should-you-gain-weight')}
TIPHAVEN_ARTICLES = [
    'average-bartender-salary-with-tips',
    'best-tip-tracking-apps-for-servers',
    'how-much-do-servers-make-in-tips',
    'server-tip-out-percentage',
    'server-tips-and-taxes',
    'splitting-tips-by-hours-worked'
]

class ArticleParser(HTMLParser):
    def __init__(self, route):
        super().__init__(convert_charrefs=True)
        self.route = route
        self.active = False
        self.root = []
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if not self.active and tag == 'article' and 'article-shell' in attrs.get('class', '').split():
            self.active = True
            return
        if not self.active:
            return
        for name in ('href', 'src'):
            if name in attrs and attrs[name] and not attrs[name].startswith(('#', 'data:', 'mailto:', 'tel:')) and not urlparse(attrs[name]).scheme:
                attrs[name] = urljoin(self.route, attrs[name])
        node = {'tag': tag, 'attrs': attrs, 'children': []}
        self.stack[-1].append(node)
        if tag not in {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'}:
            self.stack.append(node['children'])

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)

    def handle_endtag(self, tag):
        if not self.active:
            return
        if tag == 'article':
            self.active = False
            return
        if len(self.stack) > 1:
            self.stack.pop()

    def handle_data(self, data):
        if self.active and data:
            self.stack[-1].append(data)

def first(html, pattern, default=''):
    match = re.search(pattern, html, re.I | re.S)
    return unescape(match.group(1).strip()) if match else default

def attr_meta(html, key, value):
    return first(html, rf'<meta\s+{key}="{re.escape(value)}"\s+content="([^"]*)"')

files = []
for app in GUIDE_APPS:
    files.extend((app, file) for file in sorted((ROOT / app / 'guides').glob('*/index.html')) if (app, file.parent.name) not in SKIP)
files.extend(('tiphaven', ROOT / 'tiphaven' / slug / 'index.html') for slug in TIPHAVEN_ARTICLES)

pages = {}
for app, file in files:
    html = file.read_text()
    slug = file.parent.name
    route = f'/{app}/{slug}/' if app == 'tiphaven' else f'/{app}/guides/{slug}/'
    parser = ArticleParser(route)
    parser.feed(html)
    json_ld = []
    for raw in re.findall(r'<script type="application/ld\+json">([\s\S]*?)</script>', html, re.I):
        json_ld.append(json.loads(raw))
    pages[f'{app}.guide.{slug}'] = {
        'meta': {
            'title': first(html, r'<title>([\s\S]*?)</title>'),
            'description': attr_meta(html, 'name', 'description'),
            'robots': attr_meta(html, 'name', 'robots'),
            'themeColor': attr_meta(html, 'name', 'theme-color'),
            'appleItunesApp': attr_meta(html, 'name', 'apple-itunes-app'),
            'ogType': attr_meta(html, 'property', 'og:type'),
            'ogTitle': attr_meta(html, 'property', 'og:title'),
            'ogDescription': attr_meta(html, 'property', 'og:description'),
            'ogImage': attr_meta(html, 'property', 'og:image'),
            'twitterCard': attr_meta(html, 'name', 'twitter:card'),
            'icon': first(html, r'<link\s+rel="icon"\s+href="([^"]+)"'),
            'jsonLd': json_ld
        },
        'article': parser.root,
        'card': None
    }

for app in ['bulkbro', 'bumpecho', 'fovri', 'migraloom', 'oqvi', 'tiphaven']:
    overview = (ROOT / app / 'guides' / 'index.html').read_text()
    cards = re.findall(r'<a class="guide-card" href="([^"]+)"><h2>([\s\S]*?)</h2><p>([\s\S]*?)</p><span>[\s\S]*?</span></a>', overview)
    for order, (href, title, description) in enumerate(cards):
        slug = href.rstrip('/').split('/')[-1]
        page_id = f'{app}.guide.{slug}'
        if page_id in pages:
            pages[page_id]['card'] = {
                'title': unescape(title.strip()),
                'description': unescape(description.strip()),
                'href': unescape(href),
                'order': order
            }

destination = ROOT / 'i18n' / 'content' / 'en' / 'guide-articles.json'
ui = {
    'skipToArticle': 'Skip to article',
    'allGuides': 'All guides',
    'backTo': 'Back to',
    'guidesLower': 'guides',
    'guides': 'Guides',
    'calculator': 'Calculator',
    'healthDisclaimer': 'Health disclaimer',
    'websitePrivacy': 'Website privacy'
}
destination.write_text(json.dumps({'ui': ui, 'pages': pages}, ensure_ascii=False, indent=2) + '\n')
print(f'Extracted {len(pages)} guide articles to {destination}')
