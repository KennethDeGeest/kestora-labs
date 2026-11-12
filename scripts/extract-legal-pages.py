import json
import re
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse

ROOT = Path(__file__).resolve().parent.parent
APPS = ['bulkbro', 'bumpecho', 'calmber', 'fovri', 'migraloom', 'oqvi', 'tiphaven', 'walkbop']
PAGES = [(f'{app}.legal.{kind}', f'{app}/{kind}.html', f'/{app}/{kind}.html') for app in APPS for kind in ['privacy', 'terms', 'support']]
PAGES += [('bulkbro.legal.health', 'bulkbro/health.html', '/bulkbro/health.html'), ('site.legal.privacy', 'privacy.html', '/privacy.html')]
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'}

def normalized_url(route, value):
    if not value or value.startswith(('#', 'data:', 'mailto:', 'tel:')) or urlparse(value).scheme:
        return value
    return urljoin(route, value)

class BodyParser(HTMLParser):
    def __init__(self, route):
        super().__init__(convert_charrefs=True)
        self.route = route
        self.active = False
        self.script_depth = 0
        self.root = []
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        if tag == 'body':
            self.active = True
            return
        if not self.active:
            return
        if tag == 'script':
            self.script_depth += 1
            return
        if self.script_depth:
            return
        mapped = dict(attrs)
        for name in ('href', 'src'):
            if name in mapped:
                mapped[name] = normalized_url(self.route, mapped[name])
        node = {'tag': tag, 'attrs': mapped, 'children': []}
        self.stack[-1].append(node)
        if tag not in VOID:
            self.stack.append(node['children'])

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)

    def handle_endtag(self, tag):
        if tag == 'body':
            self.active = False
            return
        if tag == 'script' and self.script_depth:
            self.script_depth -= 1
            return
        if self.active and not self.script_depth and len(self.stack) > 1:
            self.stack.pop()

    def handle_data(self, data):
        if self.active and not self.script_depth and data:
            self.stack[-1].append(data)

def first(html, pattern, default=''):
    match = re.search(pattern, html, re.I | re.S)
    return unescape(match.group(1).strip()) if match else default

def attributes(fragment):
    return {name: unescape(value) for name, value in re.findall(r'([\w:-]+)="([^"]*)"', fragment)}

pages = {}
for page_id, relative, route in PAGES:
    html = (ROOT / relative).read_text()
    parser = BodyParser(route)
    parser.feed(html)
    meta_tags = []
    for fragment in re.findall(r'<meta\s+([^>]+)>', html, re.I):
        attrs = attributes(fragment)
        if 'content' in attrs and ('name' in attrs or 'property' in attrs) and attrs.get('name') != 'viewport':
            meta_tags.append(attrs)
    icons = []
    for fragment in re.findall(r'<link\s+([^>]+)>', html, re.I):
        attrs = attributes(fragment)
        if attrs.get('rel') in {'icon', 'apple-touch-icon'}:
            attrs['href'] = normalized_url(route, attrs['href'])
            icons.append(attrs)
    styles = [normalized_url(route, unescape(href)) for href in re.findall(r'<link\s+rel="stylesheet"\s+href="([^"]+)"', html, re.I)]
    external_scripts = [normalized_url(route, unescape(src)) for src in re.findall(r'<script\s+src="([^"]+)"[^>]*></script>', html, re.I)]
    inline_scripts = [raw.strip() for raw in re.findall(r'<script(?![^>]*type="application/ld\+json")[^>]*>([\s\S]*?)</script>', html, re.I) if raw.strip()]
    json_ld = [json.loads(raw) for raw in re.findall(r'<script type="application/ld\+json">([\s\S]*?)</script>', html, re.I)]
    pages[page_id] = {
        'meta': {'title': first(html, r'<title>([\s\S]*?)</title>'), 'tags': meta_tags, 'icons': icons, 'jsonLd': json_ld},
        'stylesheets': styles,
        'externalScripts': external_scripts,
        'inlineScripts': inline_scripts,
        'body': parser.root
    }

destination = ROOT / 'i18n' / 'content' / 'en' / 'legal-pages.json'
destination.write_text(json.dumps({'pages': pages}, ensure_ascii=False, indent=2) + '\n')
print(f'Extracted {len(pages)} legal pages to {destination}')
