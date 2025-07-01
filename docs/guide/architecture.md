# Architecture

## Designing with Simplicity in Mind

Before jumping into development, the first and most important step was to **deeply understand the requirements**. The goal wasn’t just to make it work — but to design the **simplest possible solution** that is reliable, scalable, and easy to maintain.

The initial requirements were clear:  
- Ingest a list of the top 250 movies from an S3 source  
- Filter the top 10 entries  
- Enrich each movie with metadata from an external API  
- Store the final, enriched data back in S3

## Core Architecture: The Minimal Viable Flow

<!-- Diagram placeholder -->
<img src="/images/core_arch.png" alt="Core Architecture Diagram" style="width: 115%; max-width: 900px;" />

To meet these goals effectively, I designed a **minimal yet complete serverless data pipeline**, composed of two core components:

### 1. `GetMoviesAndSendToQueue` (Lambda Function)

This function is responsible for:
- Reading the original dataset from a public S3 bucket  
- Filtering the top 10 movies  
- Sending each movie as a message to an Amazon SQS queue

This approach ensures asynchronous processing and decouples ingestion from enrichment.

### 2. `EnrichAndStoreMovie` (Lambda Function)

Triggered by each message in the queue, this function:
- Calls the OMDb API using the IMDb ID  
- Enriches the movie data with additional details  
- Stores the final, enriched movie JSON object into a designated S3 bucket

## Key Benefits of the Core Design

- ✅ **Simplicity:** Just two Lambda functions and an SQS queue  
- ⚡ **Scalability:** Fully event-driven and asynchronous  
- 💡 **Extendable:** Serves as the foundation for more advanced features (e.g., medallion layers, scheduled batches, BI)

## Evolving the Architecture: Unlocking More Value

After building a solid and minimal core pipeline, it became clear that there was room to go beyond — not by adding complexity for its own sake, but by **introducing well-justified features** that would bring long-term value, scalability, and analytical capabilities.

Each improvement below was designed with a clear purpose: to make the system more usable, more insightful, and more future-proof.

## 🪙 Medallion Architecture: Structuring the Data Lifecycle

One of the first improvements was organizing the S3 storage using the **Medallion Architecture pattern** (Bronze → Silver → Gold), which brings clarity and governance to data processing.

| Layer   | Description                                            | Value Delivered |
|---------|--------------------------------------------------------|-----------------|
| Bronze  | Raw enriched data fetched from OMDb (JSON per movie)   | Immutable, replayable source |
| Silver  | Cleaned, validated, and normalized dataset             | Reliable, schema-consistent data |
| Gold    | Aggregated, analytical-ready outputs (e.g., by genre)  | Supports BI and machine learning |


## ⚙️ Parameterized Batch Processing

To improve flexibility and control, the ingestion function was enhanced to support two configurable parameters:

- `top_n`: defines how many top movies to select (e.g., top 10, 20, 50)
- `batch_size`: defines how many movies to group into each message sent to the SQS queue

> For example, `top_n = 20` and `batch_size = 5` will result in **4 messages** in the queue, each containing **5 movies**.

This batching mechanism allows the pipeline to handle **larger workloads efficiently** while keeping downstream processing manageable and scalable.

**Value:**  

- **Fine-grained control** over data volume processed in each execution  
- **Improved fault isolation**: fewer items per message make retry logic and error tracing easier  
- **Efficient parallel processing**: each Lambda handles a batch, reducing invocation overhead  

This configuration can be adjusted via input parameters, making the pipeline **adaptable to different scenarios** — from testing small subsets to processing the full dataset at scale.


## 🧪 Automated Testing Strategy

To ensure that the pipeline could evolve safely and be trusted, a testing strategy was implemented at two levels:

### ✅ Unit Tests

Focused on isolated logic:

- Filtering the top 10 movies
- Validating OMDb response structure
- Merging enriched data correctly

### ✅ Integration Tests

Focused on the full data flow:

- S3 → Lambda → SQS → Lambda → S3
- Simulated OMDb API responses using mocks
- Ensuring data is enriched and stored correctly

**Value:**  
Improved code confidence, faster iterations, and protection against regressions.


## 🔐 Secure Secrets Management

Access to the OMDb API required storing a private key securely. Instead of hardcoding it, we used **AWS Secrets Manager**, which offers:

- Encrypted, secure storage for API keys
- Role-based access management
- Integration with Lambda environment via runtime fetch

**Value:**  
Compliance with security best practices and flexibility for rotating or updating credentials without redeploying code.

## 📊 BI with Amazon QuickSight

To extract true insights from the enriched dataset, the project was extended with **data visualization dashboards** via Amazon QuickSight.

- Dashboards showing:
  - Top genres and ratings
  - Average box office by decade
  - Distributions by director or language

- Data loaded directly from the **Gold layer** (via Athena or direct S3)

**Value:**  
Non-technical users gain access to movie insights without needing to query raw data or use code.


## 🤖 AI-Driven Insights

With a clean and enriched dataset available, the next frontier is intelligent analysis:

- **Trend detection** (e.g., rise of a genre over time)
- **Movie recommendation engines** (via similarity models)
- **LLM-powered summaries** (e.g., “What defines a top-rated movie?”)

Initial experiments included prompt-based summarization using metadata and genre tags.

**Value:**  
From descriptive to **prescriptive analytics**, transforming the pipeline into a decision-support tool.

## 📆 Scheduled Execution with AWS EventBridge

To automate data refresh, the pipeline is scheduled to run **once daily** using **Amazon EventBridge**:

- EventBridge rule triggers the ingestion Lambda every 24 hours  
- No manual execution required  
- Easily adjustable cron-like schedule

**Value:**  
Keeps data **fresh and up-to-date**, enabling near-real-time insights with zero operational overhead.

## 🏗️ Infrastructure as Code (IaC) with AWS SAM

All infrastructure — from Lambda functions to queues and permissions — is defined using **AWS SAM (Serverless Application Model)**.

- YAML-based templates  
- Full reproducibility of environments  
- Easy deployment with a single command (`sam deploy`)  
- Supports CI/CD and collaboration

**Value:**  
✔️ Faster setup  
✔️ Versioned infrastructure  
✔️ Seamless team onboarding and environment replication

## Summary of Advanced Features

| Feature                     | Purpose                             | Value Delivered                           |
|----------------------------|-------------------------------------|-------------------------------------------|
| Medallion Architecture     | Structured data lifecycle           | Reusability, lineage, auditability        |
| Batch Processing & Control | Parametrized ingestion + batching   | Scalability, flexibility                  |
| Automated Testing          | Code validation                     | Reliability, safety                       |
| Secrets Management         | Secure API key usage                | Compliance, safety                        |
| Daily Scheduling           | Automation with EventBridge         | Fresh data, zero manual effort            |
| Infrastructure as Code     | Full AWS stack in code              | Reproducibility, CI/CD readiness          |
| BI Dashboards              | Business insights via QuickSight    | Data accessibility, decision support      |
| AI Insights                | Enriched predictive analytics       | Intelligent exploration & discovery       |

&nbsp;

---


&nbsp;

# Final Architecture Overview

After implementing and validating the core pipeline, the architecture naturally evolved to support new requirements — without altering its foundation.

The solution continues to follow the same **event-driven, serverless pattern**, but now incorporates additional processing layers and automation, enabling advanced analytics and insights.



## Final Architecture Diagram

<!-- Final architecture image placeholder -->
![Final Architecture Diagram](/images/core_arch.png)

> This diagram represents the full pipeline, from ingestion and enrichment to multi-layer storage and business intelligence integration.


## Extended Data Flow: From Raw to Insight

The core flow remains unchanged:

1. **Lambda 1 – GetMoviesAndSendToQueue**  
   - Fetches top `n` movies from the source dataset  
   - Sends them to the queue in batches (`batch_size`)

2. **Lambda 2 – EnrichAndStoreMovie**  
   - Enriches each movie using the OMDb API  
   - Stores the result in the **Bronze layer** on S3

From this point, the **multi-layer architecture begins**:

3. **Lambda 3 – ProcessBronzeToSilver**  
   - Triggered when new objects are saved in the Bronze layer  
   - Cleans, validates, and normalizes data  
   - Saves the processed output in the **Silver layer**

4. **Lambda 4 – AggregateToGold**  
   - Triggered by new data in the Silver layer  
   - Uses custom logic or ML/AI models to aggregate and summarize data (e.g., by genre, year, director)  
   - Saves final analytics-ready files in the **Gold layer**

5. **Amazon QuickSight**  
   - Connected to the **Gold layer**  
   - Powers dashboards and visual insights for non-technical users


## 🔍 Summary

This layered and modular approach provides:

- ✅ A clear, maintainable **data lifecycle**
- ✅ **Separation of concerns** between raw, processed, and analytical data
- ✅ Scalable, event-driven execution from ingestion to dashboard
- ✅ A future-proof architecture ready for new use cases




