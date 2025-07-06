# Infrastructure as Code (IaC)

Infrastructure as Code (IaC) is a core principle of this project, enabling consistent, repeatable, and version-controlled infrastructure provisioning.

To achieve this, we use the **AWS Serverless Application Model (SAM)** in combination with **AWS CloudFormation**. This approach allows us to define and manage all infrastructure components — such as S3 buckets, IAM roles, Lambda functions, and event triggers — directly from declarative YAML templates.

## Why SAM?

**AWS SAM (Serverless Application Model)** is an extension of CloudFormation tailored for serverless applications. It simplifies the syntax required to define serverless resources while still translating everything into standard CloudFormation during deployment.

> For official documentation, refer to the [AWS SAM Developer Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html).


## CloudFormation Integration

All SAM templates are deployed as **CloudFormation stacks**, which can be viewed and managed via the AWS Console.

![CloudFormation Console Screenshot](/images/iac.png) 


## Example: Creating an S3 Bucket

Below is a basic example of how a Bronze-layer S3 bucket is defined using SAM:

```yaml
Resources:
  BronzeBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Ref BronzeBucketName
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true
```

## Example: Creating an IAM Role

Here is how an IAM role is provisioned for a Lambda function, following the principle of least privilege:

```yaml
Resources:
  GetMoviesAndSendToQueueLambdaRole:
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
        - PolicyName: SQSWritePolicy
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action: sqs:SendMessage
                Resource: !GetAtt ImdbMovieQueue.Arn

```

## Example: Creating a Lambda Function

Each Lambda function is fully defined with runtime, permissions, triggers, environment variables, and resource limits:

```yaml
Resources:
  GetMoviesAndSendToQueueFunction:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: GetMoviesAndSendToQueue
      Description: Fetches top movies from IMDb and sends them to SQS.
      Handler: fetch_top_movies.lambda_handler
      Runtime: python3.13
      Timeout: 60
      MemorySize: 128
      CodeUri: lambdas/fetch_top_movies/
      Environment:
        Variables:
          SQS_QUEUE_URL: !Ref ImdbMovieQueue
          IMDB_DATA_URL: !Ref imdbDataUrl
          MAX_RETRIES: !Ref maxRetries
          BASE_DELAY_SECONDS: !Ref baseDelaySeconds
      Role: !GetAtt GetMoviesAndSendToQueueLambdaRole.Arn
      Events:
        DailyScheduler:
          Type: Schedule
          Properties:
            Schedule: cron(0 3 * * ? *)
            Enabled: true
            Input: '{"top_n": 10, "batch_size": 1}'
```

## Full Template
The full template.yaml file used in this project is publicly available at:
- [View template.yaml on GitHub](https://github.com/PauloDalsoto/imdb-serverless-etl/blob/main/template.yaml)

## Learn More

To deepen your understanding of Infrastructure as Code and the technologies used in this project, explore the following resources:

- [AWS SAM Developer Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)  
  Official documentation for the AWS Serverless Application Model (SAM).

- [AWS CloudFormation Documentation](https://docs.aws.amazon.com/cloudformation/)  
  Comprehensive guide to defining and deploying AWS infrastructure as code.

- [AWS SAM GitHub Repository](https://github.com/aws/serverless-application-model)  
  Source code, issues, and community discussions for the SAM CLI and specification.

- [Deploying Serverless Applications with SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-deploying.html)  
  Step-by-step deployment workflow using the SAM CLI.