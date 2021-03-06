module.exports = {
    title: '国科前端码畜', // 设置网站标题
    dest: './dist', // 设置输出目录
    base: '/', // 设置站点根路径
    repo: 'https://github.com/zhdarry/gok-frontend', // 添加 github 链接
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
                items: [{
                    text: '分享会记录',
                    link: '/share/'
                }, {
                    text: '国科前端规范',
                    link: '/standard/'
                }]
            },
            {
                text: '犯罪名单',
                items: [{
                        text: '张瑞',
                        link: '/share/zhdarry/'
                    },
                    {
                        text: '刘尧',
                        link: '/share/サイドの妖刀劉小妖/'
                    },
                    {
                        text: '秦林',
                        link: '/share/qinlin/'
                    },
                    {
                        text: '王莹',
                        link: '/share//wangying/'
                    },
                    {
                        text: '张雪',
                        link: '/share//zhangxue/'
                    },
                    {
                        text: '谢鹏',
                        link: '/share//xiepeng/'
                    },
                    {
                        text: '苟金贵',
                        link: '/share/goujg/'
                    },
                    {
                        text: '杨朝军',
                        link: '/share/yangcj/'
                    }
                ]
            },
            {
                text: 'GitHub',
                link: 'https://github.com/zhdarry/gok-frontend'
            }
        ],
        // 为以下路由添加侧边栏
        sidebar: {
            '/share/': [
                '', {
                    title: "嘤嘤怪张大瑞",
                    collapsable: false,
                    children: [
                        '/share/zhdarry/one',
                        '/share/zhdarry/two'
                    ]
                }, {
                    title: "風のような男",
                    children: [
                        '/share/サイドの妖刀劉小妖/react1'
                    ]
                }, {
                    title: "秦林",
                    children: [
                        '/share/qinlin/js',
                        '/share/qinlin/vue',
                        '/share/qinlin/css'
                    ]
                }, {
                    title: "杨朝军",
                    children: [
                        '/share/yangcj/one',
                        '/share/yangcj/two',
                        '/share/yangcj/three'
                    ]
                },
				{
					title: "浮生若梦",
					children: ['/share/goujg/one']
				}
            ],
            '/standard': [{ //文档规范

            }]
        },

    }
}