
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/portfolioweb1/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/portfolioweb1"
  },
  {
    "renderMode": 2,
    "route": "/portfolioweb1/about"
  },
  {
    "renderMode": 2,
    "route": "/portfolioweb1/portfolio"
  },
  {
    "renderMode": 2,
    "route": "/portfolioweb1/services"
  },
  {
    "renderMode": 2,
    "route": "/portfolioweb1/contact"
  },
  {
    "renderMode": 2,
    "route": "/portfolioweb1/blog"
  },
  {
    "renderMode": 2,
    "route": "/portfolioweb1/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 17754, hash: '6c6eb24caf9a8478710317941a37a2496d50c36f8bac3c2c3ffa154e6ed24bb5', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 13580, hash: '37d4517f16c0b4d1adc397ba4cd21eea0e22e1f1846ccaca3cd59c7a93fd340a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 38318, hash: 'a6859cedbddbfb0eb1d15f42ac99f8bd4cebc30983f0577caae5d4eb9f2caac3', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 43146, hash: '8a1fe3635eab67baa62a2dc9e047eaa0b03b56c9224370986312465da7ab0805', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'portfolio/index.html': {size: 42557, hash: '4a3f77529cb1e26d6ea3fe3b1d083e7a29760913798ade057e23dacd581513bd', text: () => import('./assets-chunks/portfolio_index_html.mjs').then(m => m.default)},
    'services/index.html': {size: 39205, hash: 'adf89a16ee1c068ca484e18d75a20b888398c9ae702f75817774f3e5aabe99b2', text: () => import('./assets-chunks/services_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 41348, hash: '74e41091218fb6b8b18115a990bad320cbdb8d061de7372c9754f334fd3516ad', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'blog/index.html': {size: 46583, hash: 'e3fca1d24852822a2a67cf04f178d90787631ce1c8ee4a33cf7e66f914d9551e', text: () => import('./assets-chunks/blog_index_html.mjs').then(m => m.default)},
    'styles-DR4NF54F.css': {size: 231395, hash: '2tTk50YlV84', text: () => import('./assets-chunks/styles-DR4NF54F_css.mjs').then(m => m.default)}
  },
};
