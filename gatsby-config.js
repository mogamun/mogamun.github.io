module.exports = {
  siteMetadata: {
    title: `Contents Directory`,
    description: `개발과 기술에 대한 이야기`,
    author: `@mogamun`,
    siteUrl: `https://mogamun.github.io`,
    keywords: [`코딩`, `웹`, `개발`, `기초`, `강의`, `입문`, `HTML`, `CSS`, `JavaScript`],
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/src/contents`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `legal`,
        path: `${__dirname}/src/legal`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `wiki`,
        path: `${__dirname}/src/wiki`,
        ignore: [`**/.gitkeep`],
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [`G-WZH4G85ZWZ`],
        pluginConfig: {
          head: true,
        },
      },
    },
  ],
};
