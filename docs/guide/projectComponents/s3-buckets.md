# S3 Buckets

This project follows the [**Medallion Architecture**](/guide/projectAspects/medallionArch.md) to organize and track the evolution of data across different levels of refinement. To support this, three Amazon S3 buckets are provisioned and configured automatically using [**AWS SAM**](/guide/projectAspects/iac):

| Layer  | Purpose                        | Content Example               |
|--------|--------------------------------|-------------------------------|
| Bronze | Raw data from OMDb & IMDb      | Multiple JSONs (1 per movie)  |
| Silver | Normalized & enriched records  | Normalized CSV dataset        |
| Gold   | Final curated datasets         | Structured CSV datasets       |

By structuring the pipeline into layers, we ensure clarity, modularity, and traceability of data as it moves through the ETL process.

## Bucket Provisioning with SAM

Each bucket is created declaratively through [`template.yaml`](https://github.com/PauloDalsoto/imdb-serverless-etl/blob/main/template.yaml). Example for the Bronze layer:

```yaml
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

This ensures:

- **Restricted Access**: Public access is fully blocked to enforce security best practices.
- **Declarative Infrastructure**: All bucket configurations are managed via Infrastructure as Code, ensuring reproducibility across environments.
- **Automated Setup**: Buckets are created and configured automatically during `sam deploy`, with no manual steps required.

## Example Bucket Structure
Below are example screenshots from the AWS S3 Console, showing files organized in each bucket:
- **bronze/** folder: Raw movie data from OMDb
![AWS Secrets Manager Configuration](/images/s3-bronze.png)

- **silver/** folder: Normalized movie data
![AWS Secrets Manager Configuration](/images/s3-silver.png) 

-  **gold/** folder: Ready-to-use datasets
![AWS Secrets Manager Configuration](/images/s3-gold.png)

## Learn More
To explore the S3 buckets and their configurations, you can access them directly via the AWS Console:
- [View in AWS S3 Console](https://console.aws.amazon.com/s3/home)
- [Amazon S3 Documentation](https://docs.aws.amazon.com/s3/index.html)
- [S3 Bucket Policy Best Practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html)

> For complete configuration and provisioning details, see the [Infrastructure as Code (IaC)](/guide/projectAspects/iac.md) section.

> To understand the data layering logic, refer to the [Medallion Architecture](/guide/projectAspects/medallionArch.md) section.