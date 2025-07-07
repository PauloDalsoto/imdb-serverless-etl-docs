# IAM Roles and Permissions

The **IMDb Serverless ETL** pipeline adopts AWS IAM best practices to ensure **security**, **least privilege**, and **clear separation of responsibilities** between Lambda functions.

Each Lambda function has its own **dedicated IAM role**, defined using AWS SAM, and only includes the permissions required for its specific task. This approach improves security by reducing the blast radius of potential vulnerabilities and supports auditing and monitoring at a granular level.

## IAM Role Example: `EnrichAndStoreMovieLambdaRole`

The role for the `EnrichAndStoreMovieFunction` is designed with the **minimum required permissions** as follows:

```yaml
EnrichAndStoreMovieLambdaRole: 
  Type: AWS::IAM::Role
  Properties:
    AssumeRolePolicyDocument:
      Version: '2012-10-17'
      Statement:
        - Effect: Allow
          Principal:
            Service: lambda.amazonaws.com
          Action: sts:AssumeRole
    ManagedPolicyArns:
      - arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
    Policies:
      - PolicyName: S3WriteAndSQSReadPolicy
        PolicyDocument:
          Version: '2012-10-17'
          Statement:
            - Effect: Allow
              Action:
                - s3:PutObject
              Resource: arn:aws:s3:::<bronze-bucket-name>/bronze/*
            - Effect: Allow
              Action:
                - sqs:ReceiveMessage
                - sqs:DeleteMessage
                - sqs:GetQueueAttributes
              Resource: !GetAtt ImdbMovieQueue.Arn
            - Effect: Allow
              Action:
                - secretsmanager:GetSecretValue
              Resource: arn:aws:secretsmanager:${AWS::Region}:${AWS::AccountId}:secret:/imdb-etl/omdb-api-key-*
```

### What this role allows:

It provides only the permissions necessary for the function to complete its tasks:

- **Write to the Bronze S3 bucket**  
  Allows storing the enriched movie data under the `/bronze/` prefix.

- **Read from the SQS Queue**  
  Enables the Lambda function to receive and delete messages from the queue, and read queue metadata.

- **Access the OMDb API Key securely**  
  Grants access to retrieve the secret `/imdb-etl/omdb-api-key` stored in AWS Secrets Manager. 

## Role Breakdown by Function

| Lambda Function              | IAM Role                              | Permissions                                                                 |
|-----------------------------|----------------------------------------|------------------------------------------------------------------------------|
| `GetMoviesAndSendToQueue`   | `GetMoviesAndSendToQueueLambdaRole`    | Send messages to SQS queue                                                   |
| `EnrichAndStoreMovie`       | `EnrichAndStoreMovieLambdaRole`        | Read from SQS, fetch secret, write to Bronze S3                             |
| `ProcessBronzeToSilver`     | `ProcessBronzeToSilverLambdaRole`      | Read from Bronze S3, write to Silver S3                                     |
| `ProcessSilverToGold`       | `ProcessSilverToGoldLambdaRole`        | Read from Silver S3, write to Gold S3                                       |

> All roles also include the managed policy `AWSLambdaBasicExecutionRole`:  
    Which grants permission to upload logs to CloudWatch and execute Lambda code.


## View All IAM Roles in Detail

All IAM roles and their associated policies are **fully defined via Infrastructure as Code** using AWS SAM.  
To explore the complete configuration of all Lambda functions, roles, and permissions: [See the Infrastructure as Code (IaC) section](/guide/projectAspects/iac).
