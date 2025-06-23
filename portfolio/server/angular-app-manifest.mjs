
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/frontend/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/frontend"
  },
  {
    "renderMode": 2,
    "route": "/frontend/about"
  },
  {
    "renderMode": 2,
    "route": "/frontend/portfolio"
  },
  {
    "renderMode": 2,
    "route": "/frontend/services"
  },
  {
    "renderMode": 2,
    "route": "/frontend/contact"
  },
  {
    "renderMode": 2,
    "route": "/frontend/blog"
  },
  {
    "renderMode": 2,
    "route": "/frontend/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 17749, hash: 'aebe3c7b1d4383e66e33c9c6cbb7b585ee626e30ac3b7e273f4713e687edb087', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 13575, hash: '4f2d4754275a0093466c99a03fedf83076c1a393f863b0679a57c9a76e4d569a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 38248, hash: '5b1d02ec213ba40910043670ac1c67adf0c900e3b2c59c75c7f90ca66ac0decf', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 43071, hash: 'c866ea6d078eb957e46287e7709cb84372e3bed6490b1ed01cd58b3fbe358e7b', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'portfolio/index.html': {size: 42492, hash: '4b6713f41fa9b01ba2be5a3b44e0059d09ca4e63fa9a468663aef82271fa79fb', text: () => import('./assets-chunks/portfolio_index_html.mjs').then(m => m.default)},
    'services/index.html': {size: 39140, hash: '15b30fadde2a140da0dc61841d258fd20cd0049f511be28a0dc55ef020d6228d', text: () => import('./assets-chunks/services_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 41283, hash: '1fa0eeba4332ccbc5ada7205449d7ba255201605602611f1d1609ddfdfa27281', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'blog/index.html': {size: 46514, hash: '5255ec29bf6a38fa8cf99bdb80219f6860bea084ef2f5c371f5e061cd1e1eb5a', text: () => import('./assets-chunks/blog_index_html.mjs').then(m => m.default)},
    'styles-DR4NF54F.css': {size: 231395, hash: '2tTk50YlV84', text: () => import('./assets-chunks/styles-DR4NF54F_css.mjs').then(m => m.default)}
  },
};
