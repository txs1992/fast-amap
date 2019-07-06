module.exports = {
  base: '/fast-amap/',
  repo: 'https://github.com/txs1992/fast-amap',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'FastAMap',
      description: '基于 Vue 的高性能高德地图件库'
    },
    '/en/': {
      lang: 'en-US',
      title: 'FastAMap',
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
          { text: '组件', link: '/components/' }
        ],
        sidebar: 'auto'
        // sidebar: {
        //   '/guide/': [
        //     {
        //       title: '介绍',
        //       collapsable: false,
        //       sidebar: 'auto',
        //       children: [
        //         { text: '指南', link: '/guide/' },
        //         '',
        //         'getting-started',
        //         'directory-structure',
        //         'basic-config'
        //       ]
        //     }
        //   ]
        // }
      }
    }
  }
}
