# Overview: IMDb Serveless ETL

## Project Context

The goal is to build a serverless pipeline that fetches movie data, enriches it via an external API, and stores the final results. The initial data source is a list of the top 250 movies by IMDb rating, from which we focus on extracting and processing only the **top 10 movies**.

The project is implemented in Python, leveraging AWS Free Tier services to ensure cost-effectiveness and scalability.

![Pipeline Architecture](/images/task_pipeline.png)



## Technology Stack

- **Language:** Python  
- **AWS Lambda:** Serverless compute functions  
- **Amazon S3:** Storage for raw and enriched data  
- **Amazon SQS:** Message queue for orchestration  
- **AWS SDK (Boto3):** Python SDK for AWS integration  
- **External API:** OMDb API for data enrichment


## Essential Requirements

### Function 1 — Data Retrieval and Filtering (`GetMoviesAndSendToQueue`)

- Read the JSON file containing the top 250 movies from the S3 bucket:  
  `https://top-movies.s3.eu-central-1.amazonaws.com/Top250Movies.json`  
- Filter and extract the **top 10 movies**.  
- Send a message containing these movies to an SQS queue to trigger the next step.

### Function 2 — Enrichment and Storage (`EnrichAndStoreMovie`)

- Triggered by messages from the SQS queue (one message per movie).  
- For each movie, call the OMDb API endpoint:  
  `https://www.omdbapi.com/?apikey=[your_key]&i=[IMDb_ID]`  
- Enrich the movie object with the returned API data.  
- Store the enriched movie JSON object in an S3 bucket (to be created).


## Desired (Bonus) Requirements

- Schedule the pipeline to run **once daily** (e.g., using AWS EventBridge).  
- Define the entire infrastructure as code (IaC), e.g., using AWS SAM.  
- Securely manage the OMDb API key (e.g., with AWS Secrets Manager).  
- Provide clear documentation for the project.


## What's Next?

Now that we understand the purpose, context, and core capabilities of the project, it's time to dive deeper into **how everything works under the hood**.

In the next section, we'll explore the full architecture behind the pipeline — including the serverless components, data flow, and key design decisions that power this solution.

[Continue to Architecture →](/guide/architecture/simple)


## References

- [OMDb API - Request API Key](https://www.omdbapi.com/apikey.aspx)  
- [AWS Free Tier service limits and documentation](https://aws.amazon.com/free/?nc1=h_ls&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all)
- [AWS Python SDK - Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [AWS S3](https://aws.amazon.com/s3/)
- [AWS SQS](https://aws.amazon.com/sqs/)