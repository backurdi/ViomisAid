// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "viomis Aid",
  siteDescription:
    "A simple, hackable & minimalistic starter for Gridsome that uses Netlify CMS for content.",

  templates: {
    Post: "/:title",
    Tag: "/tag/:id",
  },

  plugins: [
    {
      // Create posts from markdown files
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Post",
        path: "content/posts/*.md",
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: "Tag",
            create: true,
          },
        },
        svgo: [
          {
            removeTitle: false,
          },
          {
            prefixIds: {
              prefix: (_, { path }) => basename(path, ".svg"),
              delim: "-",
            },
          },
          {
            removeDesc: false,
          },
          {
            removeViewBox: false,
          },
          {
            sortAttrs: true,
          },
        ],
      },
      chainWebpack: (config) => {
        config.resolve.alias.set("@images", "@/assets/images");
      },
    },
    {
      // Create posts from markdown files
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Container",
        path: "content/container/*.md",
      },
    },
    {
      // Create posts from markdown files
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Campaign",
        path: "content/campaigns/*.md",
      },
    },
    {
      // Create posts from markdown files
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "SubscriptionProjects",
        path: "content/subscription_projects/*.md",
      },
    },
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      anchorClassName: "icon icon-link",
      plugins: ["@gridsome/remark-prismjs"],
    },
  },
};
