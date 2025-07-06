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
              collapsed: true,
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
          { text: "AWS IAM", link: "/guide/projectComponents/aws-iam" },
          { text: "Secrets Manager", link: "/guide/projectComponents/secretManager" },
          { text: "AWS SQS", link: "/guide/projectComponents/aws-sqs" },
          { text: "EventBridge", link: "/guide/projectComponents/eventBridge" },
          { text: "S3 Buckets", link: "/guide/projectComponents/s3-buckets" },
          {
              text: 'Lambda Functions',
              collapsed: true,
              items: [
                { text: 'GetMoviesAndSendToQueue', link: '/guide/projectComponents/lambdas/GetMoviesAndSendToQueue' },
                { text: 'EnrichAndStoreMovie', link: '/guide/projectComponents/lambdas/EnrichAndStoreMovie' },
                { text: 'ProcessBronzeToSilver', link: '/guide/projectComponents/lambdas/ProcessBronzeToSilver' },
                { text: 'ProcessSilverToGold', link: '/guide/projectComponents/lambdas/ProcessSilverToGold' }
              ]
          },
          { text: "QuickSight", link: "/guide/projectComponents/quickSight" },
        ],
      },
      {
        text: "Project Aspects",
        collapsible: true,
        items: [
          { text: "Infrastructure as Code (IaC)", link: "/guide/projectAspects/iac" },
          { text: "Medallion Architecture", link: "/guide/projectAspects/medallionArch" },
          { text: "Event Triggers", link: "/guide/projectAspects/event-trigger" },
          { text: "Logging Strategy", link: "/guide/projectAspects/logging" },
          { text: "Error Handling", link: "/guide/projectAspects/error-handling" },
          { text: "Automated Testing", link: "/guide/projectAspects/testing" },
          { text: "Documentation", link: "/guide/projectAspects/documentation" },
        ],
      },
      {
        text: "Next Steps",
        collapsible: true,
        items: [
          { text: "CI/CD", link: "/guide/projectAspects/ai-ml" },
          { text: "AI and Machine Learning", link: "/guide/projectAspects/ai-ml" }
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
