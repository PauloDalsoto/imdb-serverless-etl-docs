# Lambda Function: `EnrichAndStoreMovie`

The `EnrichAndStoreMovie` function is the second step of the ETL pipeline. It consumes messages from the SQS queue, enriches each movie record using the OMDb API, and stores the enriched results in the **Bronze Layer (S3)** for further transformation.

![Lambda Flow EnrichAndStore](/images/EnrichAndStoreMovie.png)

This function is responsible for:

- Consuming messages from Amazon SQS.
- Enriching each movie with metadata retrieved from the OMDb API.
- Storing each enriched movie as a JSON file in the **bronze bucket**.
- Writing a `_SUCCESS` marker file upon completion of the final batch.

## How It Works

![Lambda Architecture Diagram](/images/diag-enrich.png)

1. Reads environment variables defined by the SAM template:
   - `OMDB_API_SECRET_NAME`
   - `TARGET_S3_BUCKET`
   - `OMDB_URL`
   - `MAX_RETRIES`
   - `BASE_DELAY_SECONDS`

2. Initializes three core services:
   - `SecretsService`: fetches the **OMDb API key** from AWS Secrets Manager.
   - `OMDBService`: handles the enrichment logic by calling the OMDb API.
   - `S3Service`: uploads each enriched record into Amazon S3.

3. For each movie in the SQS message:
   - Retrieves its IMDb ID and title.
   - Enriches it with metadata from OMDb.
   - Uploads the final record to the **bronze/{YYYY-MM-DD}/{imdb_id}.json** path in S3.

4. If the message is marked as the final batch:
   - Uploads a `_SUCCESS` marker to signal pipeline completeness for that day.

## Defined by AWS SAM
This Lambda function is defined using the AWS Serverless Application Model (SAM) in the `template.yaml` file.

### AWS IAM Role

This Lambda function uses a dedicated IAM role, defined by SAM, adhering to the **principle of least privilege**. The role grants access only to the necessary services.

### Permissions granted include:

- **AWS Secrets Manager**
  - `secretsmanager:GetSecretValue`
- **Amazon S3**
  - `s3:PutObject`
- **Amazon SQS**
  - `sqs:ReceiveMessage`, `sqs:DeleteMessage`

> For complete configuration and provisioning details, see the [Infrastructure as Code (IaC)](/guide/projectAspects/iac.md) page.

## Trigger

This function is triggered by **Amazon SQS**, consuming messages as they are published by the `GetMoviesAndSendToQueue` function.

```yaml
Events:
  SQSTrigger:
    Type: SQS
    Properties:
      Queue: !GetAtt ImdbMovieQueue.Arn
      BatchSize: 1
```

## Source Code
You can view and explore the full implementation here:

- [View on GitHub](https://github.com/PauloDalsoto/imdb-serverless-etl/blob/main/lambdas/enrich_and_store_movies/enrich_and_store_movie.py)
