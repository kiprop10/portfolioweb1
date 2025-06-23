
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/portfolioweb/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/portfolioweb"
  },
  {
    "renderMode": 2,
    "route": "/portfolioweb/about"
  },
  {
    "renderMode": 2,
    "route": "/portfolioweb/portfolio"
  },
  {
    "renderMode": 2,
    "route": "/portfolioweb/services"
  },
  {
    "renderMode": 2,
    "route": "/portfolioweb/contact"
  },
  {
    "renderMode": 2,
    "route": "/portfolioweb/blog"
  },
  {
    "renderMode": 2,
    "route": "/portfolioweb/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 17753, hash: '56977cede25538cd3fc1e77e47fe2b7e6a0d856cd7817630b008afbb7c4aa824', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 13579, hash: 'd88395b13ffa8efad9c71a5e824b83530841c7e2231210b2a36d4aa34ad82491', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 38304, hash: '72246edb869b5a1d9f08bed0065d196e7abe009b192e86a287c73b5ab4a0abd6', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 43131, hash: 'd0405456bc776662c53e40e7071a55bf0fe023503c3f457ef7cfc61b015dbe5b', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'portfolio/index.html': {size: 42544, hash: '25d90ecdfe8930249e81c6ced41d5a33ee1022a9c55fa284f5bbb229381acdae', text: () => import('./assets-chunks/portfolio_index_html.mjs').then(m => m.default)},
    'services/index.html': {size: 39192, hash: 'de7b8246f896b33c6244a6e90482fe830564e8253e8551b9fdca84a6b02228b3', text: () => import('./assets-chunks/services_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 41335, hash: '08da9de9e5c2dffd1d62f5ee00d7c87ab5c2819fe18989608ae109a851e3a666', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'blog/index.html': {size: 46566, hash: '5dbf7f2017cd3b7acf95ecc8b4280e26bba11a7c720d5a1983d7202d4486c8b6', text: () => import('./assets-chunks/blog_index_html.mjs').then(m => m.default)},
    'styles-DR4NF54F.css': {size: 231395, hash: '2tTk50YlV84', text: () => import('./assets-chunks/styles-DR4NF54F_css.mjs').then(m => m.default)}
  },
};
