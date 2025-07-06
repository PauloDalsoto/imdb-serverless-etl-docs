# Lambda Function: `ProcessSilverToGold`

The `ProcessSilverToGold` function is the final step in the ETL pipeline. It transforms the **normalized Silver Layer** dataset into analytical outputs in the **Gold Layer**, enabling rich insights and data exploration.

![Silver to Gold Flow](/images/ProcessSilverToGold.png)

This function is responsible for:

- Reading structured CSV data from the Silver bucket.
- Performing a series of analytical transformations using `pandas`.
- Storing insights and aggregated results as separate CSV files in the Gold bucket.

## How It Works

![Silver to Gold Diagram](/images/diag-silverToGold.png)

1. Reads environment variables defined by the SAM template:
   - `S3_BUCKET_SOURCE`
   - `S3_BUCKET_TARGET`
   - `MAX_RETRIES`
   - `BASE_DELAY_SECONDS`

2. Triggered when the normalized dataset is created under the Silver bucket.

3. Loads the file `silver/movies_normalized.csv` using the `S3Service`.

4. Executes the `SilverToGoldProcessor`, which performs the following transformations to generate analytical datasets:
   - **Top 10 Movies by IMDb Rating**
   - **Movies by Genre**
   - **Movies by Country**
   - **Movies per Year**
   - **Total Box Office Revenue per Year**
   - **Top 5 Directors by Movie Count**

5. Saves each output as a CSV file in the Gold bucket under the `gold/` prefix.

## Defined by AWS SAM

This Lambda function is defined using the AWS Serverless Application Model (SAM) in the `template.yaml` file.

### AWS IAM Role

The function uses a scoped IAM role to perform its actions securely, following the principle of least privilege, allowing:

- Write access to silver bucket (`silver/*`)
- Read access to gold bucket (`gold/*`)

### Permissions granted include:

- **Amazon S3**
  - `s3:ListBucket` on the Silver bucket
  - `s3:GetObject` to `silver/*` on Silver bucket
  - `s3:PutObject` to `gold/*` on Gold bucket

> For full provisioning details, see the [Infrastructure as Code (IaC)](/guide/projectAspects/iac.md) page.

## Trigger
This function is triggered by **Amazon S3 events** whenever **any file is created** in the Silver bucket by the [`ProcessBronzeToSilver`](/guide/projectComponents/lambdas/ProcessBronzeToSilver.md) lambda function.

This event-driven behavior ensures a **chained and automated execution** of the pipeline: once the normalized data is written to the Silver layer, this function is automatically invoked to generate the analytical Gold layer outputs — no manual intervention required.

## Source Code
You can view and explore the full implementation here:
- [View on GitHub](https://github.com/PauloDalsoto/imdb-serverless-etl/blob/main/lambdas/process_silver_to_gold/process_silver_to_gold.py)
