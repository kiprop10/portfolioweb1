
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
    'index.csr.html': {size: 17754, hash: 'e806b53888879445a2d7d3bb5acc94d0b912c52d88ebb27cb4b5d01f7fe6530a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 13580, hash: '00311a08fb3d0a8b9eea333bf63bc4f22b463177098da430b78da6e6a927894e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 38318, hash: '767ece8b969bf252405724eb85c38d8530ed4e398b59f2e0aac9cd86fdd37139', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 43146, hash: '1f97d36ad2a40c3cab100ef393a62c2d89d60bd795f5295f04618fa9c6429f53', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'portfolio/index.html': {size: 42557, hash: '46f4c375fcac1bcfb16bfa3d568c7c752a632a706b04d625209c01e05786526d', text: () => import('./assets-chunks/portfolio_index_html.mjs').then(m => m.default)},
    'services/index.html': {size: 39205, hash: 'ee2de108833fddc258b8c518720bbf3472b6b60283e53dfca178dc681acabe7c', text: () => import('./assets-chunks/services_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 41471, hash: '45d45a50dc04c9bbd98114a3aa9b0b1c8703aca5bd0dccaa71d6e6c9e4164357', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'blog/index.html': {size: 45060, hash: '83b20415d0954c3eb3bb30b238e0feea541dd4c3c7337ed9be427ace4ac3268a', text: () => import('./assets-chunks/blog_index_html.mjs').then(m => m.default)},
    'styles-DR4NF54F.css': {size: 231395, hash: '2tTk50YlV84', text: () => import('./assets-chunks/styles-DR4NF54F_css.mjs').then(m => m.default)}
  },
};
