export const site = {
  origin: 'https://kestoralabs.com',
  sourceLocale: 'en',
  previewDirectory: '.i18n-preview'
};

// A locale cannot be built or published merely by adding a folder. It must be
// explicitly enabled after its complete content set passes validation.
export const locales = {
  en: { label: 'English', htmlLang: 'en', prefix: '', enabled: true },
  es: { label: 'Español', htmlLang: 'es', prefix: '/es', enabled: false },
  fr: { label: 'Français', htmlLang: 'fr', prefix: '/fr', enabled: false }
};

// Pages move into this registry one template type at a time. The first pilot is
// deliberately an English app page; generated output remains preview-only.
export const pages = [
  {
    id: 'fovri.app',
    type: 'app-page',
    route: '/fovri/',
    source: 'fovri/index.html',
    appStore: 'https://apps.apple.com/app/id6824272880',
    routes: {
      guides: '/fovri/guides/',
      privacy: '/fovri/privacy.html',
      terms: '/fovri/terms.html',
      support: '/fovri/support.html'
    },
    assets: {
      icon: '/assets/fovri.png',
      screenshots: [
        '/assets/screens/fovri-cook-next.png',
        '/assets/screens/fovri-recipe.png',
        '/assets/screens/fovri-groceries.png'
      ]
    }
  }
];
