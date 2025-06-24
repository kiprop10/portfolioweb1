
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
    'index.csr.html': {size: 17754, hash: 'f6203c5461867dfc14d25084388e070f42fa2952e29f3456a14ac4decf3dae4e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 13580, hash: 'de7030a9bc6a249d494197def6265fcce70f5248804ba02b29bcb440df0144db', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 38318, hash: '6e53d8d5f8dc895ffffac6137897bf4b785dd28c02cf32f2bdaa22736259c077', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 43146, hash: '1e5daaa708b16d6b0738b7b4f621804006cc465e0fe178e5b4a6e235991f4f54', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'portfolio/index.html': {size: 42557, hash: '728d5b8e78e6a0b32715eeea57fde60a6d389b183bb2866d60ba719b1c7a5988', text: () => import('./assets-chunks/portfolio_index_html.mjs').then(m => m.default)},
    'services/index.html': {size: 39205, hash: '8621906843df64db88109b79169cd3b3eb6cb13344139aca4430f3d2b25476ff', text: () => import('./assets-chunks/services_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 41471, hash: 'bedb8c3cc111feaf655292ad888744e9353798a947be0e5a3a6b2dd334913f80', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'blog/index.html': {size: 46257, hash: '7c2a7b39dbb5c08a0036e432878ef19de72fb7fdebfd1d6614f4fd0fff86898d', text: () => import('./assets-chunks/blog_index_html.mjs').then(m => m.default)},
    'styles-DR4NF54F.css': {size: 231395, hash: '2tTk50YlV84', text: () => import('./assets-chunks/styles-DR4NF54F_css.mjs').then(m => m.default)}
  },
};
