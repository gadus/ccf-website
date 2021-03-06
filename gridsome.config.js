module.exports = {
  siteName: 'Code Can Fly Website',
  siteDescription: "Code Can Fly",
  siteUrl: 'codecandfly.com',
  titleTemplate: `%s | Code Can Fly`,
  icon: '/static/logo/favicons/favicon.ico',

  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      plugins: [
        ['gridsome-plugin-remark-shiki', {
          theme: 'min-light'
        }]
      ]
    }
  },

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/posts/**/*.md',
        typeName: 'Post',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true,
          },
          author: {
            typeName: 'Author',
            create: true,
          },
        },
      },
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-135446199-1',
      },
    },
    // {
    //   use: '@gridsome/plugin-sitemap',
    //   options: {
    //     cacheTime: 600000, // default
    //   },
    // },
    // {
    //   use: 'gridsome-plugin-rss',
    //   options: {
    //     contentTypeName: 'Post',
    //     feedOptions: {
    //       title: 'Bleda, a Gridsome blog starter',
    //       feed_url: 'https://gridsome-starter-bleda.netlify.com/feed.xml',
    //       site_url: 'https://gridsome-starter-bleda.netlify.com',
    //     },
    //     feedItemOptions: node => ({
    //       title: node.title,
    //       description: node.description,
    //       url: 'https://gridsome-starter-bleda.netlify.com' + node.path,
    //       author: node.author,
    //       date: node.date,
    //     }),
    //     output: {
    //       dir: './static',
    //       name: 'feed.xml',
    //     },
    //   },
    // },
  ],

  templates: {
    Post: '/:title',
    Tag: '/tag/:id',
    Author: '/author/:id',
  },

  chainWebpack: config => {
    config.module
      .rule('css')
      .oneOf('normal')
      .use('postcss-loader')
      .tap(options => {
        options.plugins.unshift(...[
          require('postcss-import'),
          require('postcss-nested'),
          require('tailwindcss'),
        ])

        return options
      })
  },
}
