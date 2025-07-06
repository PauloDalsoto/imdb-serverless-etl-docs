# Private Key Handling

In serverless architectures, it's essential to handle sensitive credentials with care.  
Hardcoding secrets into code or environment variables can lead to major security risks.

## AWS Secrets Manager

This project follows best practices by using **AWS Secrets Manager** to securely store and access the **OMDb API key** used to enrich movie data.

Instead of embedding the API key directly into the codebase or environment, we retrieve it securely at runtime using IAM-permitted access.

## Secret Configuration

Before deployment, you must manually create a secret in AWS Secrets Manager:

| Field            | Value                        |
|------------------|------------------------------|
| **Name**         | `/imdb-etl/omdb-api-key`     |
| **Secret type**  | Plaintext key-value (JSON)   |
| **Content**      | `{ "omdbapi_key": "your_api_key_here" }` |

This naming convention is referenced directly in the Lambda environment (`OMDB_API_SECRET_NAME`), ensuring consistency and avoiding exposure.

> IAM roles are strictly scoped to allow only **read access to this specific secret**, improving the security posture of the pipeline.

## Screenshot Example

Below is a screenshot of the configured secret in AWS Secrets Manager:

![AWS Secrets Manager Configuration](/images/secretManager.png)


### Sample Code – Retrieving a Secret in Python
Use these code samples to retrieve the secret in your application.
```python
import boto3
from botocore.exceptions import ClientError

def get_secret():
    secret_name = "/imdb-etl/omdb-api-key"
    region_name = "your-region" 

    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        raise e

    secret = get_secret_value_response['SecretString']
    return secret
```



## Learn More

You can explore and manage your secrets directly via the AWS Console:

- [View in AWS Secrets Manager Console](https://console.aws.amazon.com/secretsmanager/home#/listSecrets)

For detailed guidance on how to create and manage secrets, refer to the [AWS Secrets Manager documentation](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html).

> All secrets used in this project are configured securely and retrieved dynamically by the Lambda functions with scoped IAM permissions.
