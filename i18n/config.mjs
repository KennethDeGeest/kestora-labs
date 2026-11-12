export const site = {
  origin: 'https://kestoralabs.com',
  sourceLocale: 'en',
  previewDirectory: '.i18n-preview'
};

// A locale cannot be built or published merely by adding a folder. It must be
// explicitly enabled after its complete content set passes validation.
export const locales = {
  en: { label: 'English', htmlLang: 'en', prefix: '', enabled: true }
};

const appPage = ({ slug, appStore, icon, screenshots, guides = true }) => ({
    id: `${slug}.app`,
    type: 'app-page',
    route: `/${slug}/`,
    source: `${slug}/index.html`,
    appStore,
    routes: {
      guides: guides ? `/${slug}/guides/` : null,
      privacy: `/${slug}/privacy.html`,
      terms: `/${slug}/terms.html`,
      support: `/${slug}/support.html`
    },
    assets: { icon, screenshots }
});

// App pages are fully registered. Generated output remains preview-only until
// every other page type has been migrated and explicitly promoted.
export const pages = [
  appPage({ slug: 'calmber', appStore: 'https://apps.apple.com/app/id6833412600', icon: '/assets/calmber.png', guides: false, screenshots: [
    '/assets/screens/calmber-home.png',
    '/assets/screens/calmber-plan.png',
    '/assets/screens/calmber-insights.png'
  ] }),
  appPage({ slug: 'walkbop', appStore: 'https://apps.apple.com/app/id6828370811', icon: '/assets/walkbop.png?v=20261030', screenshots: [
    '/assets/screens/walkbop-race.png?v=20261030',
    '/assets/screens/walkbop-items.png?v=20261030',
    '/assets/screens/walkbop-character.png?v=20261030'
  ] }),
  appPage({ slug: 'bulkbro', appStore: 'https://apps.apple.com/app/id6770476671', icon: '/assets/bulkbro.png', screenshots: [
    '/assets/screens/bulkbro-today.png',
    '/assets/screens/bulkbro-log.png',
    '/assets/screens/bulkbro-progress.png'
  ] }),
  appPage({ slug: 'tiphaven', appStore: 'https://apps.apple.com/app/id6805177188', icon: '/assets/tiphaven.png?v=20261014-2', screenshots: [
    '/assets/screens/tiphaven-today.png?v=20261014-2',
    '/assets/screens/tiphaven-shift.png?v=20261014-2',
    '/assets/screens/tiphaven-insights.png?v=20261014-2'
  ] }),
  appPage({ slug: 'migraloom', appStore: 'https://apps.apple.com/app/id6811065580', icon: '/assets/migraloom.png', screenshots: [
    '/assets/screens/migraloom-home.png?v=20261011',
    '/assets/screens/migraloom-patterns.png?v=20261011',
    '/assets/screens/migraloom-visit.png?v=20261011'
  ] }),
  appPage({ slug: 'bumpecho', appStore: 'https://apps.apple.com/app/id6812684414', icon: '/assets/bumpecho.png', screenshots: [
    '/assets/screens/bumpecho-home.png',
    '/assets/screens/bumpecho-soundbook.png',
    '/assets/screens/bumpecho-settings.png'
  ] }),
  appPage({ slug: 'oqvi', appStore: 'https://apps.apple.com/app/id6815273355', icon: '/assets/treeidentifier.png', screenshots: [
    '/assets/screens/treeidentifier-home.png',
    '/assets/screens/treeidentifier-map.png',
    '/assets/screens/treeidentifier-discovery.png'
  ] }),
  appPage({ slug: 'fovri', appStore: 'https://apps.apple.com/app/id6824272880', icon: '/assets/fovri.png', screenshots: [
        '/assets/screens/fovri-cook-next.png',
        '/assets/screens/fovri-recipe.png',
        '/assets/screens/fovri-groceries.png'
  ] })
];
