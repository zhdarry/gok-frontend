module.exports = {
  title: '加油站', // 设置网站标题
  dest: './dist', // 设置输出目录
  base: '/gok-frontdevelopment/', // 设置站点根路径
  repo: 'https://github.com/zhdarry', // 添加 github 链接
  head: [
    ['link', {
      rel: 'icon',
      href: '/favicons.ico'
    }] // 在spa应用头部加入link标签
  ],
  themeConfig: {
    // 添加导航栏
    nav: [{
        text: '加油站',
        link: '/zhdarry/'
      },
      {
        text: '犯罪名单',
        items: [{
            text: '张瑞',
            link: '/zhdarry/'
          },
          {
            text: '刘尧',
            link: '/zhdarry/'
          },
          {
            text: '秦林',
            link: '/zhdarry/'
          },
          {
            text: '王莹',
            link: '/zhdarry/'
          },
          {
            text: '张雪',
            link: '/zhdarry/'
          },
          {
            text: '谢鹏',
            link: '/zhdarry/'
          },
          {
            text: '苟金贵',
            link: '/zhdarry/'
          },
          {
            text: '杨朝军',
            link: '/zhdarry/'
          }
        ]
      },
    ],
    // 为以下路由添加侧边栏
    sidebar: {
      '/zhdarry/': [{
        title: '潇洒迷人的张大瑞', // 显示的节点名称
        children: [
          ['/zhdarry/one', '7 个实用的 vue 开发 tips'], // 子节点，不设置的话，将会从MD文件中读出标题
          ['/zhdarry/two', 'try...catch封装我们的错误处理']
        ]
      }],
      '/css/': [{
        title: 'css',
        children: [
          '/css/three',
          '/css/four'
        ]
      }]
    }
  }
}