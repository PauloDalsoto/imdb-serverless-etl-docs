# Deployment

This guide explains how to set up and deploy the **IMDb Serverless ETL** pipeline using the **AWS SAM CLI** and **AWS CLI**.

## Prerequisites

Before deploying the project, ensure that the following tools are installed on your machine:

| Tool        | Installation Guide                                                                 |
|-------------|--------------------------------------------------------------------------------------|
| AWS CLI     | https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html                 |
| AWS SAM CLI | https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html |
| Python 3.11+| https://www.python.org/downloads/                                                   |
| Git         | https://git-scm.com/downloads                                                       |


## AWS Configuration

Make sure your AWS CLI is properly configured.

Follow the official AWS guide to set up credentials and region:
- https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html


## Required Manual Setup

Before deploying the pipeline, you must manually create a **secret** in AWS Secrets Manager to store your OMDb API key.

### Secret details

| Field            | Value                        |
|------------------|------------------------------|
| **Name**         | `/imdb-etl/omdb-api-key`     |
| **Secret type**  | Plaintext key-value (JSON)   |
| **Content**      | `{ "omdbapi_key": "your_api_key_here" }` |

Ensure the secret name **matches** exactly what is referenced in the `template.yaml`.

## Clone the Repository

```bash
git clone https://github.com/PauloDalsoto/imdb-serverless-etl
cd imdb-serverless-etl
```

## Environment Variables
Before deploying, make sure to configure the required environment variables.

All variables can be configured in the `samconfig.toml` file.  
For more details on how to set up these variables, visit the [**config page**](sam-config.md).

## Deployment
To streamline the deployment process, the project provides a utility script named `deploy.py`, located at the root of the repository.

This script automates the main deployment steps in the correct order:

1. Builds the SAM application  
2. Deploys the stack using `samconfig.toml`  
3. Performs post-deployment configuration (e.g., S3 trigger setup)

To deploy the entire pipeline just run the follow comand:

```bash
python deploy.py
```

## Clean Up Resources

To remove all deployed resources (Lambda functions, S3 buckets, SQS queues, IAM roles, etc.), use:

```bash
sam delete
```

## References

### Tools & Frameworks
- AWS SAM CLI: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html  
- AWS CLI: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html  
- Python: https://www.python.org/downloads/  
- Git: https://git-scm.com/downloads  

### AWS Services
- AWS Lambda: https://docs.aws.amazon.com/lambda/  
- Amazon S3: https://docs.aws.amazon.com/s3/  
- Amazon SQS: https://docs.aws.amazon.com/sqs/  
- AWS Secrets Manager: https://docs.aws.amazon.com/secretsmanager/  

### Credential & Configuration Management
- AWS CLI Credentials Configuration: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html  
- Creating Secrets in AWS Secrets Manager: https://docs.aws.amazon.com/secretsmanager/latest/userguide/manage_create-basic-secret.html  
