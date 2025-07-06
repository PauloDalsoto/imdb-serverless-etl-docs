# SAM Configuration File

The `samconfig.toml` file is used to define default parameters and settings for deploying the **IMDb Serverless ETL** pipeline using the AWS SAM CLI.  
It simplifies the deployment process by predefining values, avoiding the need to pass flags manually each time.

This file is automatically used by `sam build` and `sam deploy` commands.

---

### Sample `samconfig.toml`

```toml
# samconfig.toml
# Configuration for AWS SAM CLI
# Do NOT commit sensitive data here

version = 0.1

[default]
[default.deploy]
[default.deploy.parameters]
stack_name = "imdb-etl-stack"
region = "us-east-1"

resolve_s3 = true

capabilities = "CAPABILITY_IAM"

confirm_changeset = false

disable_rollback = true

parameter_overrides = [
  "maxRetries=3",
  "baseDelaySeconds=1",
  "BronzeBucketName=mdb-etl-bronze-whoortuydmo9",
  "SilverBucketName=imdb-etl-silver-whoortuydmo9", 
  "GoldBucketName=imdb-etl-gold-whoortuydmo9",
  "imdbDataUrl=https://top-movies.s3.eu-central-1.amazonaws.com/Top250Movies.json",
  "omdbApiUrl=https://www.omdbapi.com/"
]
```

### Explanation of Key Parameters

| Parameter              | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| `stack_name`           | Name of the AWS CloudFormation stack to be created.                         |
| `region`               | AWS region where the stack will be deployed.                                |
| `resolve_s3`           | Automatically creates or selects an S3 bucket for deployment artifacts.     |
| `capabilities`         | Required for creating IAM roles during deployment (`CAPABILITY_IAM`).       |
| `confirm_changeset`    | When set to `false`, deploy proceeds without manual confirmation.           |
| `disable_rollback`     | Keeps the stack in a failed state for troubleshooting.                      |
| `parameter_overrides`  | List of parameters passed to the CloudFormation template.                   |

---

### Parameter Overrides Used

These parameters are defined in your `template.yaml` and are customized per deployment:

- `max_retries`: Maximum number of retries for failed Lambda functions.
- `base_delay_seconds`: Initial delay in seconds before retrying a failed Lambda function.
- `BronzeBucketName`: Name of the S3 bucket for raw data (Bronze layer).
- `SilverBucketName`: Name of the S3 bucket for cleaned/enriched data (Silver layer).
- `GoldBucketName`: Name of the S3 bucket for final, ready-to-query datasets (Gold layer).
- `imdbDataUrl`: URL of the IMDb data source to be processed.
- `omdbApiUrl`: URL of the OMDb API for movie details.
---

>  **Note:** Never store sensitive data like API keys or credentials in `samconfig.toml`. Use **AWS Secrets Manager** instead.
