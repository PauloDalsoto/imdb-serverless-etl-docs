export default {
  title: "IMDb Serverless ETL",
  description:
    "Documentation for a scalable serverless ETL pipeline using AWS and Python",
  lang: "en-US",
  cleanUrls: true,
  base: "/imdb-serverless-etl-docs/",
  ignoreDeadLinks: true,

  themeConfig: {
    logo: "/logo.png",
    siteTitle: "IMDb Serverless ETL",

    search: {
      provider: "local",
    },

    nav: [
      { text: "About Me", link: "/about-me" },
      { text: "Guide", link: "/guide/overview" },
      { text: "Deployment", link: "/guide/deployment" },
      { text: "Configs", link: "/guide/sam-config" },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/PauloDalsoto",
      },
      { icon: "linkedin", link: "https://www.linkedin.com/in/paulodalsoto/" },
    ],

    sidebar: [
      {
        text: "Guide",
        collapsible: false,
        items: [
          { text: "Overview", link: "/guide/overview" },
          {
              text: 'Architecture',
              collapsed: false,
              items: [
                { text: 'Simple Architecture', link: '/guide/architecture/simple' },
                { text: 'Feature Evolution & Value', link: '/guide/architecture/evolution' },
                { text: 'Final Architecture', link: '/guide/architecture/final' }
              ]
            },
          { text: "Deployment", link: "/guide/deployment" },
          { text: "SAM Config", link: "/guide/sam-config" },
        ],
      },
      {
        text: "Project Components",
        collapsible: true,
        items: [
          { text: "AWS IAM", link: "/components/secrets" },
          { text: "Secrets Manager", link: "/components/secrets" },
          { text: "S3 Buckets", link: "/components/s3" },
          {
              text: 'Lambda Functions',
              collapsed: false,
              items: [
                { text: 'GetMoviesAndSendToQueue', link: '/guide/architecture/simple' },
                { text: 'EnrichAndStoreMovie', link: '/guide/architecture/evolution' },
                { text: 'ProcessBronzeToSilver', link: '/guide/architecture/final' },
                { text: 'ProcessSilverToGold', link: '/guide/architectures/final' }
              ]
          },
          { text: "AWS SQS", link: "/components/sqs" },
          { text: "EventBridge", link: "/components/eventbridge" },
          { text: "QuickSight", link: "/components/secrets" },
        ],
      },
      {
        text: "Project Aspects",
        collapsible: true,
        items: [
          { text: "Infrastructure as Code (IaC)", link: "/aspects/iac" },
          { text: "Medallion Architecture", link: "/aspects/medallion-architecture" },
          { text: "Event Triggers", link: "/aspects/triggers" },
          { text: "Logging Strategy", link: "/aspects/logging" },
          { text: "Error Handling & Fault Tolerance", link: "/aspects/error-handling" },
          { text: "Automated Testing", link: "/aspects/testing" },
          { text: "Documentation", link: "/aspects/documentation" },
        ],
      }
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "© 2025 Paulo Dalsoto",
    },

    markdown: {
      theme: "material-palenight",
      lineNumbers: false,
    },

    returnToTopLabel: "Back to Top",
    sidebarMenuLabel: "Menu",
  },
};
