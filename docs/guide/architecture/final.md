# Final Architecture Overview

After validating the core pipeline, the architecture naturally evolved to accommodate new features — without altering its foundational principles.

The final solution maintains a **serverless, event-driven design**, now extended with additional processing layers, automated scheduling, and integrated analytics — enabling a full journey from raw data to business-ready insights.


##  Final Architecture Diagram 

![Final Architecture Diagram](/images/final_arch.png)

> This diagram illustrates the complete data flow: from ingestion and enrichment to layered storage, transformation, and business intelligence integration.


##  Extended Data Flow: From Raw to Insight

The original flow remains intact, now enhanced with modular downstream layers.

### **1. Ingestion: Lambda – GetMoviesAndSendToQueue**
- This Lambda function initiates the pipeline by fetching the top n movies (default 10) from the source dataset.
- Movies are sent in batches (batch_size, default 1) to an SQS queue.
- The function is activated by an EventBridge trigger, which is scheduled to occur once daily at 3 AM.

### **2. Enrichment: Lambda – EnrichAndStoreMovie**
- This Lambda function enriches the initial movie data with metadata from the OMDb API.
- Triggered by messages arriving in the SQS queue.
- The OMDb API key is securely managed through AWS Secrets Manager.
- The enriched data, typically in a raw, extended JSON format, is then stored in the Bronze layer S3 bucket.

### **3. Cleaning and Normalization: Lambda – ProcessBronzeToSilver**
- This Lambda function transforms the raw, enriched data into a clean, standardized format.
- It is activated by a trigger from new data objects being created or updated in the Bronze layer S3 bucket. 
- The refined and standardized records are then written to the Silver layer S3 bucket.

### **4. Aggregation and Optimization: Lambda – ProcessSilverToGold**
- This Lambda function aggregates and optimizes the standardized data from the Silver layer, preparing it for analytical consumption.
- It is activated by a trigger from new data being added to the Silver layer S3 bucket. 
- The result is a set of analytics-ready datasets, stored in the Gold layer S3 bucket

### **5. Data Visualization: Amazon QuickSight**
- QuickSight provides a powerful business intelligence and data visualization platform.
- It is directly connected to the Gold layer S3 bucket, allowing it to query the analytics-ready datasets.


> Each Lambda function described above operates under a dedicated IAM Role, ensuring the principle of least privilege by granting only the necessary permissions for its specific tasks within the AWS environment.

## Summary of Benefits

This layered and modular architecture delivers:

- **Clear data lifecycle** from raw to refined to aggregated
- **Separation of concerns** across processing stages
- **Scalability and resilience**, with event-driven automation
- **Observability and fault tolerance** through logging and retries
- **Analytics readiness**, with BI and AI integration
- **Infrastructure as Code**, enabling reproducible deployments

> The architecture is now fully production-ready and easily extensible to support new domains, datasets, and use cases.
