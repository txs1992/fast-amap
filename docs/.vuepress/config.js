module.exports = {
  base: '/fast-amap/',
  repo: 'https://github.com/txs1992/fast-amap',
  dest: './dist',
  head: [
    [
      'style',
      { type: 'text/css' },
      '.page-nav, .theme-default-content:not(.custom) { max-width: 90% !important; margin: auto; } '
    ]
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Fast AMap',
      description: '基于 Vue 的高性能高德地图件库'
    },
    '/en/': {
      lang: 'en-US',
      title: 'Fast AMap',
      description: 'Vue-based High Performance Gaud Map Library'
    }
  },
  themeConfig: {
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: [
          { text: '指南', link: '/guide/' },
          { text: 'API', link: '/api/' }
        ],
        sidebar: {
          '/guide/': ['', 'getting-started', 'development'],
          '/api/': ['', 'map', 'polygon']
        }
      }
    }
  }
}
