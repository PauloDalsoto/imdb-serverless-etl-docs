# Medallion Architecture

The **Medallion Architecture** is a modern data design pattern used in data lake and lakehouse solutions to structure and progressively refine data as it flows through multiple layers. It enables teams to organize datasets in a modular, scalable, and maintainable way — ideal for analytics, reporting, and machine learning pipelines.

## Overview

At its core, the Medallion Architecture breaks down data processing into three distinct layers:

![Medallion Architecture Diagram](/images/medallion.png)

### Bronze Layer
The **Bronze** layer is the raw data layer. It contains the initial data ingested from the source system — in this project, it includes enriched movie metadata retrieved from the OMDb API. It is stored in a semi-structured format (e.g., JSON), with minimal transformation.

- Purpose: Capture raw, enriched data for traceability and reprocessing.
- Format: JSON files.

### Silver Layer
The **Silver** layer holds cleansed and normalized data. It transforms raw inputs from the Bronze layer into consistent, validated, and structured formats, ready for business logic application and analytics.

- Purpose: Normalize, flatten, and prepare data.
- Format: CSV with defined schema.

### Gold Layer
The **Gold** layer is the final, business-ready dataset. It contains aggregated, curated data designed for high-performance analytical workloads such as dashboards and business intelligence.

- Purpose: Serve business insights and enable efficient querying.
- Format: Multiple CSV outputs (e.g., top-rated movies, genre distribution, box office per year).

## Why Medallion Architecture?

This architecture was chosen because it:

- **Aligns with best practices** for modern, scalable data pipelines.
- **Decouples responsibilities** across stages (enrichment, normalization, analytics).
- **Improves maintainability and traceability** by isolating transformations at each level.
- **Enables reprocessing** without touching the original source.
- **Integrates well** with the event-driven, serverless approach of this project.

Using this structure ensures that each transformation step is clearly defined and traceable, while enabling the flexibility to evolve each layer independently.


## Learn More

To explore more about the Medallion Architecture and its applications in modern data platforms:

- [Databricks: What is the Medallion Architecture?](https://www.databricks.com/glossary/medallion-architecture)
- [Microsoft: What is the medallion lakehouse architecture?](https://learn.microsoft.com/en-us/azure/databricks/lakehouse/medallion)
