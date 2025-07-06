# Lambda Function: `GetMoviesAndSendToQueue`

The `GetMoviesAndSendToQueue` function is the entry point of the ETL pipeline. It fetches the top-rated movies from the IMDb dataset and sends them to an SQS queue, where they will be further enriched and stored by downstream functions.

![AWS Secrets Manager Configuration](/images/GetMoviesAndSendToQueue.png)

This function is responsible for:

- Fetching data from a public IMDb dataset URL.
- Filtering the **Top N** movies, configurable via input (default: 10).
- Splitting the result into batches, configurable via input (default: 1).
- Sending each batch to an Amazon SQS queue.

## How It Works
![AWS Secrets Manager Configuration](/images/diag-getMovies.png)

1. Reads environment variables defined by the SAM template:
   - `SQS_QUEUE_URL`
   - `IMDB_DATA_URL`
   - `MAX_RETRIES`
   - `BASE_DELAY_SECONDS`
2. Initializes the `IMDBService` to fetch and sort movies.
    - Fetches the movie data from the IMDB_DATA_URL using requests.get().
    - Applies a custom with_retries decorator to handle transient HTTP failures with exponential backoff and logging.
    - Filters and validates movies by checking for valid numeric rank values.
    - Sorts movies based on ascending rank and returns the top N.

3. Splits the sorted top movies into batches according to the batch_size parameter provided in the event payload.
4. Uses the `SQSService` to send each batch to the queue.
    - Messages are tagged to indicate whether they are part of a sequence or the final batch.
    > For more details about the SQS service, refer to the [AWS SQS](/guide/projectComponents/aws-sqs) page.

## Defined by AWS SAM
This Lambda function is defined using the AWS Serverless Application Model (SAM) in the template.yaml file. 

### AWS IAM Role
This Lambda function is associated with a dedicated IAM role also defined in SAM. The role follows the **principle of least privilege**, ensuring the function has only the permissions it needs to operate securely.

### Permissions granted include:

- **Amazon SQS**
  - `sqs:SendMessage`

> For complete configuration and provisioning details, see the [Infrastructure as Code (IaC)](/guide/projectAspects/iac.md) page.

## Trigger
This function is triggered automatically **every day at 03:00 UTC** using Amazon EventBridge (CloudWatch Events). This enables time-based scheduling without manual invocation.

```yaml
Events:
    DailyScheduler:
        Type: Schedule
        Properties:
        Schedule: cron(0 3 * * ? *)
        Enabled: true
        Input: '{"top_n": 10, "batch_size": 1}'
```

## Source Code
You can view and explore the full implementation here:

- [View on GitHub](https://github.com/PauloDalsoto/imdb-serverless-etl/blob/main/lambdas/fetch_top_movies/fetch_top_movies.py)
