# Amazon SQS

Amazon Simple Queue Service (SQS) was used in this project to enable asynchronous, decoupled communication between the Lambda functions composing the ETL pipeline.


## FIFO Queue: A Key Implementation Detail
![Amazon SQS Console](/images/sqs.png)

A crucial design choice was to use a **FIFO (First-In, First-Out) queue**. This allowed us to:

- Ensure strict ordering of messages.
- Precisely identify when the last record in a batch has been processed.

## Integration with Lambda Functions

The FIFO queue usage is further explored in the two main Lambda functions interacting with the queue:

- [`GetMoviesAndSendToQueue`](../projectComponents/lambdas/GetMoviesAndSendToQueue.md)
- [`EnrichAndStoreMovie`](../projectComponents/lambdas/EnrichAndStoreMovie.md)

These functions leverage the identification of the last message in a batch to coordinate advancing the pipeline to the next stage.

> For reference, the `_SUCCESS` file is created in the bronze bucket by the `EnrichAndStoreMovie` Lambda function to signal that the last  batch of movies has been successfully processed, allowing the pipeline to proceed.

## Learn More

- [Amazon SQS Documentation](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)
- [Amazon SQS Console](https://console.aws.amazon.com/sqs/home)