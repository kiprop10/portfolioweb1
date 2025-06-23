
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/about"
  },
  {
    "renderMode": 2,
    "route": "/portfolio"
  },
  {
    "renderMode": 2,
    "route": "/services"
  },
  {
    "renderMode": 2,
    "route": "/contact"
  },
  {
    "renderMode": 2,
    "route": "/blog"
  },
  {
    "renderMode": 2,
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 17740, hash: 'f1a8cad74eea0868a4b5b299bc0fd15793383737e1a4b9cda5305bd736e1f246', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 13566, hash: '63cbc00cef9e4fb1c9eed4f0a2021a52b7001b53e11528d3cf36ff4cd90b5039', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 38122, hash: '8b05c47a592e51aadc6ffeb490d8340c7ee5071dc8e6e4f2783668e225251de8', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 42936, hash: '1dc9b4a6efebb6803875a86a55724ccdd30126cb07d6601e43c6cdaf868693ad', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'portfolio/index.html': {size: 42375, hash: '638f0e55e3e9bb3b85ba5c86ae806249a40e0e9a59325fbfc31fdbb9bae6d3b6', text: () => import('./assets-chunks/portfolio_index_html.mjs').then(m => m.default)},
    'services/index.html': {size: 39023, hash: 'a0315dfb3880f2213929b1518d5b6a0c96bdb3365217e5c49f196c449b4206e7', text: () => import('./assets-chunks/services_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 41166, hash: 'cddb8eeb84b47795212363138365280b3f551fddd15ca843bff0336ec89d0825', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'blog/index.html': {size: 46401, hash: 'd2c8121ff75982533815b58534a60d1bb9fcc4b0c34a164cb60974a1c2a977fe', text: () => import('./assets-chunks/blog_index_html.mjs').then(m => m.default)},
    'styles-DR4NF54F.css': {size: 231395, hash: '2tTk50YlV84', text: () => import('./assets-chunks/styles-DR4NF54F_css.mjs').then(m => m.default)}
  },
};
