---
layout: home

# Hero section
hero:
  name: IMDb Serverless ETL
  text: A modern, serverless architecture to process and enrich IMDb data on AWS.
  image:
    src: /logo.png
    alt: IMDb ETL Project Logo
  tagline: Scalable data pipeline using AWS Lambda, SQS, S3, Secrets Manager and more.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/overview
    - theme: alt
      text: View on GitHub
      link: https://github.com/PauloDalsoto/imdb-serverless-etl

# Features section
features:
  - icon: ⚡️
    title: Built with AWS Serverless Stack
    details: Leverages AWS Lambda, SQS, S3, and EventBridge to create a scalable and cost-efficient pipeline.
  - icon: 🏗️
    title: IaC with AWS SAM
    details: Full infrastructure is provisioned using AWS SAM, enabling repeatable, version-controlled deployments.
  - icon: 🏅
    title: Medallion Architecture
    details: Data is organized in Bronze, Silver, and Gold layers — enabling progressive refinement and analytics readiness.
  - icon: 🧪
    title: Unit & Integration Tests
    details: Robust test coverage with Pytest ensures reliability across core functions and infrastructure boundaries.
  - icon: 📊
    title: Visual Insights with QuickSight
    details: Data from the Gold layer is visualized through interactive dashboards using Amazon QuickSight.
  - icon: 🔐
    title: Secure by Design
    details: Secrets are managed with AWS Secrets Manager, and all functions include retry logic and detailed logging.

# Meta property
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: IMDb Serverless ETL
  - - meta
    - name: title
      content: IMDb Serverless ETL
  - - link
    - rel: icon
      type: image/png
      href: logo.png
---

<!-- Custom home layout -->
<div class="custom-layout">
  <h1> Welcome to the IMDb Serverless ETL Project</h1>
  <p>This project builds a fully serverless data pipeline using AWS services. It fetches the top 250 movies from IMDb, enriches them using the OMDb API, stores the results in S3, and enables visual insights — all while following cloud-native best practices.</p>
  <img src="/images/final_arch.png" alt="IMDb Serverless ETL Diagram" style="max-width: 80%; height: auto; display: block; margin: 1px auto;">

  <a href="/imdb-serverless-etl-docs/guide/overview" class="btn">Read the Full Guide</a>
</div>
