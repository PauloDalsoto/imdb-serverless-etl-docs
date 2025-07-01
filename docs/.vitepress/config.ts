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
          { text: "Architecture", link: "/guide/architecture" },
          { text: "Deployment", link: "/guide/deployment" },
          { text: "SAM Config", link: "/guide/sam-config" },
        ],
      },
      {
        text: "Components",
        collapsible: true,
        items: [
          { text: "Lambda Functions", link: "/components/lambda-functions" },
          { text: "SQS Queue", link: "/components/sqs" },
          { text: "EventBridge", link: "/components/eventbridge" },
          { text: "S3 Bucket", link: "/components/s3" },
          { text: "Secrets Manager", link: "/components/secrets" },
        ],
      },
      {
        text: "Project Aspects",
        collapsible: true,
        items: [
          { text: "Logging", link: "/aspects/logging" },
          { text: "Error Handling", link: "/aspects/error-handling" },
          {
            text: "Medallion Architecture",
            link: "/aspects/medallion-architecture",
          },
          { text: "Triggers", link: "/aspects/triggers" },
          { text: "Infrastructure as Code", link: "/aspects/iac" },
          {
            text: "Private Key Handling",
            link: "/aspects/private-key-handling",
          },
        ],
      },
    ],

    docFooter: {
      prev: false,
      next: false,
    },

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
