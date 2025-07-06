# IMDb Serverless ETL Documentation

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue)](https://paulodalsoto.github.io/imdb-serverless-etl-docs/)

[![Main Project](https://img.shields.io/badge/Main%20Project-GitHub-green)](https://github.com/PauloDalsoto/imdb-serverless-etl)

Official documentation for the **IMDb Serverless ETL** project — a comprehensive AWS-based pipeline for fetching, enriching, and storing IMDb Top 250 movie data. This documentation site provides detailed installation guides, architecture overview, deployment instructions, and technical specifications.

## About

This documentation repository serves as the main documentation hub for the [IMDb Serverless ETL project](https://github.com/PauloDalsoto/imdb-serverless-etl). The documentation covers:

- **Architecture Overview** - Understand the serverless pipeline design
- **Deployment Guide** - Step-by-step AWS deployment instructions
- **Component Details** - Deep dive into each AWS service used
- **Project Aspects** - Documentation, testing, logging, and error handling
- **Usage Instructions** - How to run and monitor the ETL pipeline

## 🚀 Live Demo

The documentation is already live and accessible at:
**[https://paulodalsoto.github.io/imdb-serverless-etl-docs/](https://paulodalsoto.github.io/imdb-serverless-etl-docs/)**

## 📋 Prerequisites

Before running this documentation site locally, ensure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Git** for cloning the repository

## 🛠️ Getting Started

### Clone the Repository

```bash
git clone https://github.com/PauloDalsoto/imdb-serverless-etl-docs.git
cd imdb-serverless-etl-docs
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

Start the VitePress development server:

```bash
npm run docs:dev
```

The documentation site will be available at `http://localhost:5173`

### Build for Production

To build the documentation for production:

```bash
npm run docs:build
```

### Preview Production Build

To preview the production build locally:

```bash
npm run docs:serve
```

## 📁 Project Structure

```
imdb-serverless-etl-docs/
├── docs/                          # Documentation source files
│   ├── index.md                   # Homepage
│   ├── about-me.md               # About the author
│   ├── guide/                    # Main documentation guides
│   │   ├── overview.md           # Project overview
│   │   ├── architecture.md       # Architecture documentation
│   │   ├── deployment.md         # Deployment guide
│   │   ├── sam-config.md         # SAM configuration
│   │   ├── architecture/         # Architecture details
│   │   ├── projectAspects/       # Project aspects (testing, logging, etc.)
│   │   └── projectComponents/    # AWS components documentation
│   ├── components/               # VitePress components
│   └── public/                   # Static assets
│       ├── logo.png
│       └── images/               # Documentation images
├── package.json                  # Project dependencies
└── README.md                     # This file
```

## 🎯 Main Project

This documentation site is for the main IMDb Serverless ETL project. To explore the actual ETL pipeline implementation, visit:

**[https://github.com/PauloDalsoto/imdb-serverless-etl](https://github.com/PauloDalsoto/imdb-serverless-etl)**

## 🔧 Technology Stack

- **[VitePress](https://vitepress.dev/)** - Static site generator
- **[Vue.js](https://vuejs.org/)** - Frontend framework
- **[Markdown](https://www.markdownguide.org/)** - Documentation format
- **GitHub Pages** - Hosting platform

## 📚 Documentation Sections

### Architecture
- Evolution of the architecture design
- Final architecture overview
- Simple architecture diagrams

### Project Components
- AWS IAM roles and policies
- S3 bucket configurations
- Lambda functions
- EventBridge setup
- SQS queues
- QuickSight dashboards
- AWS Secrets Manager

### Project Aspects
- Infrastructure as Code (IaC)
- Event-driven architecture
- Medallion architecture pattern
- Error handling strategies
- Logging and monitoring
- Testing methodologies

## 🤝 Contributing

Contributions to improve the documentation are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Contact

For questions or suggestions about the documentation, please reach out through the main project repository or create an issue in this documentation repository.

## 📄 License

This documentation is part of the IMDb Serverless ETL project. Please refer to the main project repository for license information.

---

**Built with ❤️ using VitePress**