# Lambda Function: `ProcessBronzeToSilver`

The `ProcessBronzeToSilver` function transforms enriched movie data from the **Bronze Layer (raw JSON)** into a structured and normalized format in the **Silver Layer (CSV)**.

![ProcessBronzeToSilver Flow](/images/ProcessBronzeToSilver.png)

This function is responsible for:

- Detecting a completed data ingestion batch based on the presence of a `_SUCCESS` file in the Bronze bucket.
- Reading all movie `.json` files associated with that date.
- Normalizing and flattening the data structure.
- Storing the result as a CSV file in the **Silver bucket** for further use.


## How It Works

![Bronze to Silver Architecture](/images/diag-bronzeToSilver.png)

1. Reads environment variables defined by the SAM template:
   - `S3_BUCKET_SOURCE`
   - `S3_BUCKET_TARGET`
   - `MAX_RETRIES`
   - `BASE_DELAY_SECONDS`

2. Triggered by an **Amazon S3 event** when a file _SUCCESS is created:
   - This indicates that a batch of movie data has been successfully ingested into the Bronze Layer.

3. Extracts the date from the event (defaulting to today's date) to identify the corresponding data files in the Bronze Layer.

4. Loads all `.json` movie records under that prefix using the `S3Service`.

5. Uses the `BronzeToSilverProcessor` to:
- Flatten JSON fields into tabular format using `pandas`.
- Keep only relevant types (str, int, float, bool, list).
- Save the output as a single CSV file in:
  ```
  silver/movies_normalized.csv
  ```

> This function enables structured data consumption and prepares the dataset for analytics in the Gold Layer.

## Defined by AWS SAM

This Lambda function is defined using the AWS Serverless Application Model (SAM) in the `template.yaml` file.

### AWS IAM Role

The function assumes a custom IAM role that adheres to the **principle of least privilege**, allowing:

- Read access to bronze bucket (`bronze/*`)
- Write access to silver bucket (`silver/*`)

### Permissions granted include:

- **Amazon S3**
- `s3:ListBucket` on Bronze bucket
- `s3:GetObject` to `bronze/*` on Bronze bucket
- `s3:PutObject` to `silver/*` on Silver bucket

> For complete configuration and provisioning details, see the [Infrastructure as Code (IaC)](/guide/projectAspects/iac.md) page.

## Trigger
This Lambda is triggered by **Amazon S3 event notifications**. Specifically, when a `_SUCCESS` file is created in any `bronze/YYYY-MM-DD/` folder on the Bronze bucket:
> For reference, the `_SUCCESS` file is created by the [`EnrichAndStoreMovie`](/guide/projectComponents/lambdas/EnrichAndStoreMovie) lambda function to indicate that a batch of movies has been successfully processed.

## Source Code
You can view and explore the full implementation here:

- [View on GitHub](https://github.com/PauloDalsoto/imdb-serverless-etl/blob/main/lambdas/process_bronze_to_silver/process_bronze_to_silver.py)
