# Evolving the Architecture: Unlocking More Value

After building a solid and minimal core pipeline, it became clear that there was room to go beyond — not by adding complexity for its own sake, but by **introducing well-justified features** that would bring long-term value, scalability, and analytical capabilities.

Each improvement below was designed with a clear purpose: to make the system more usable, more insightful, and more future-proof.


## Parameterized Batch Processing

To improve flexibility and control, the ingestion function was enhanced to support two configurable parameters:

- `top_n`: defines how many top movies to select (e.g., top 10, 20, 50)
- `batch_size`: defines how many movies to group into each message sent to the SQS queue

> For example, `top_n = 20` and `batch_size = 5` will result in **4 messages** in the queue, each containing **5 movies**.

This batching mechanism allows the pipeline to handle **larger workloads efficiently** while keeping downstream processing manageable and scalable.

**Value:**  

- **Fine-grained control** over data volume processed in each execution .
- **Improved fault isolation**: fewer items per message make retry logic and error tracing easier. 
- **Efficient parallel processing**: each Lambda handles a batch, reducing invocation overhead.  

This configuration can be adjusted via event input, making the pipeline **adaptable to different scenarios** — from testing small subsets to processing the full dataset at scale.


## Medallion Architecture: Structuring the Data Lifecycle

One of the first improvements was organizing the S3 storage using the **Medallion Architecture pattern** (Bronze → Silver → Gold), which brings clarity and governance to data processing.

| Layer   | Description                                            | Value Delivered |
|---------|--------------------------------------------------------|-----------------|
| Bronze  | Raw enriched data fetched from OMDb (JSON per movie)   | Immutable, replayable source |
| Silver  | Cleaned, validated, and normalized dataset             | Reliable, schema-consistent data |
| Gold    | Aggregated, analytical-ready outputs (e.g., by genre)  | Supports BI and machine learning |

**Value:**  
- **Clear data lineage**: Easily track how data evolves across layers.  
- **Scalable architecture**: Supports growing complexity without changing the core logic.  
- **Simplified debugging**: Allows partial reprocessing without restarting the entire pipeline.  
- **Audit & governance ready**: Makes it easy to document and explain data transformations.  
- **BI & ML friendly**: The Silver layer feeds ML pipelines; the Gold layer powers dashboards.


## Fault Tolerance with Retry Logic

To increase system robustness, all external operations were made fault-tolerant using a **configurable retry mechanism**. Instead of failing on the first error, each interaction now attempts to recover from transient issues gracefully.

This retry system is controlled via two environment variables:

```
MAX_RETRIES=3
BASE_DELAY_SECONDS=2
```
Where Retry Logic Is Applied
- Reading or writing files in Amazon S3
- Sending messages to Amazon SQS
- Fetching data from the OMDb API
- Accessing secrets from AWS Secrets Manager

**Value:**  
- **Increased reliability**: Recovers from intermittent network or service issues.
- **Fails gracefully**: Prevents entire pipeline failures due to one bad request.
- **Flexible control**: Easily adjustable via environment variables, per environment or workload.

## Structured Logging for Observability

As the architecture evolved, it became essential to maintain clear visibility across the growing number of moving parts. To support this, structured and centralized logging was implemented throughout all Lambda functions.

Logs are emitted using Python’s built-in logging system:

```python
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

logger.info("Movie enrichment started", extra={"movie_id": imdb_id})
logger.warning("OMDb API returned incomplete data")
logger.error("Failed to store enriched movie", exc_info=True)
```

---

### Logging Design

- Logs are emitted in a structured, consistent format
- Contextual information is always included: movie ID, batch number, retry count, function name
- Supports standard log levels: `DEBUG`, `INFO`, `WARNING`, `ERROR`

**Value:**  
- Faster debugging and root cause analysis.
- Better monitoring for operational health.
- Improved developer experience during development and maintenance.

## Scheduled Execution with AWS EventBridge

To automate data refresh, the pipeline is scheduled to run **once daily** using **Amazon EventBridge**:

- EventBridge rule triggers the ingestion Lambda every 24 hours.  
- No manual execution required.  
- Easily adjustable cron-like schedule.

**Value:**  
Keeps data **fresh and up-to-date**, enabling near-real-time insights with zero operational overhead.


## Infrastructure as Code (IaC) with AWS SAM

All infrastructure — from Lambda functions to queues and permissions — is defined using **AWS SAM (Serverless Application Model)**.

- YAML-based templates.  
- Full reproducibility of environments.  
- Easy deployment with a single command (`sam deploy`).  
- Supports CI/CD and collaboration.

**Value:**  
- Faster setup.  
- Versioned infrastructure.  
- Seamless team onboarding and environment replication.


## Secure Secrets Management

Access to the OMDb API required storing a private key securely. Instead of hardcoding it, we used **AWS Secrets Manager**, which offers:

- Encrypted, secure storage for API keys.
- Role-based access management.
- Integration with Lambda environment via runtime fetch.

**Value:**  
- Compliance with security best practices and flexibility for rotating or updating credentials without redeploying code.


## Automated Testing Strategy

To ensure the pipeline remains reliable, maintainable, and safe to evolve, a robust testing strategy was implemented across two levels:

### Unit Tests

Designed to validate individual components and business logic in isolation:

- Extracting the top **N** movies based on ranking.
- Validating the structure and content of the OMDb API response.
- Correctly merging and formatting enriched movie data.

### Integration Tests

Simulate the entire pipeline workflow to verify components interact correctly:

- End-to-end flow: **S3 → Lambda → SQS → Lambda → S3**.
- Mocked OMDb API responses to test enrichment logic under realistic conditions.
- Ensured proper batching, message metadata, and final storage in S3.


**Value:**
- Boosted confidence during refactoring and scaling.
- Enabled faster development cycles through early bug detection.
- Reduced risk of regressions with every deployment.



## BI with Amazon QuickSight

To extract true insights from the enriched dataset, the project was extended with **data visualization dashboards** via Amazon QuickSight.

- Data loaded directly from the **Gold layer**.

**Value:**  
- Non-technical users gain access to movie insights without needing to query raw data or use code.

## Summary of Advanced Features

| Feature                     | Purpose                                  | Value Delivered                                  |
|----------------------------|------------------------------------------|--------------------------------------------------|
| Batch Processing & Control | Parametrized ingestion and batching      | Scalability, flexibility                         |
| Medallion Architecture     | Structured multi-layer data lifecycle    | Reusability, lineage, auditability               |
| Fault Tolerance            | Retry logic for unstable operations      | Reliability, graceful failure recovery           |
| Structured Logging         | Consistent logging across all functions  | Observability, simplified debugging              |
| Daily Scheduling           | Automation using EventBridge             | Fresh data, zero manual effort                   |
| Infrastructure as Code     | Define all AWS resources via SAM         | Reproducibility, CI/CD readiness                 |
| Secrets Management         | Secure handling of API keys              | Compliance, credential isolation                 |
| Automated Testing          | Unit and integration test coverage       | Stability, confidence in code quality            |
| BI Dashboards              | Analytics-ready outputs with QuickSight  | Business insights, data-driven decisions         |

