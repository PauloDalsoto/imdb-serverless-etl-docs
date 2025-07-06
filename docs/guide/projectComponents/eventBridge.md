# Amazon EventBridge
Amazon EventBridge provides a reliable and fully managed event bus that can schedule and route events to AWS services, such as Lambda. In this project, it is used to **automatically trigger the ETL workflow on a daily basis**, ensuring that fresh data is fetched and processed consistently.

It is used as the **primary trigger** for starting the serverless ETL pipeline.

## Defined via AWS SAM

The rule that triggers the pipeline is defined in the `template.yaml` file using the AWS Serverless Application Model (SAM).
> For complete configuration and provisioning details, see the [Infrastructure as Code (IaC)](/guide/projectAspects/iac.md) section.

Example definition:

```yaml
Events:
  DailyScheduler:
    Type: Schedule
    Properties:
    Schedule: cron(0 3 * * ? *)
    Enabled: true
    Input: '{"top_n": 10, "batch_size": 1}'
```

This rule is attached to the first function in the pipeline:
- [`GetMoviesAndSendToQueue`](../projectComponents/lambdas/GetMoviesAndSendToQueue.md)

This function is responsible for fetching the latest top-rated movies from IMDb and sending them to the SQS queue to start the ETL process.

## Learn More

- [Amazon EventBridge – Official Documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/what-is-amazon-eventbridge.html)  
- [Amazon EventBridge Console](https://console.aws.amazon.com/events/home)
