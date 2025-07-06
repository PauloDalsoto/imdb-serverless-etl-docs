# Logging Strategy

A consistent and informative logging strategy was adopted across all Lambda functions in this project. Logs are essential for tracking execution flows, identifying errors, monitoring behavior, and enabling effective debugging and observability in production environments.

## Logger Setup

Each Lambda function uses Python's built-in `logging` module. The logger is initialized at the top of the script and configured to log at the `INFO` level by default:

```python
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)
```
## Logging in Practice
Log statements are placed strategically throughout the functions lifecycle to capture:
- Start and end of execution
- Input parameters and environment state
- Process steps and conditional branches
- Error messages and failure points

## Example Usage
### Starting GetMoviesAndSendToQueue
```python
logger.info("Starting GetMoviesAndSendToQueue function")

if not SQS_QUEUE_URL or not IMDB_DATA_URL:
    logger.error("Missing environment variables.")
    return build_response(500, "Missing environment variables.")

logger.info(f"Event params: top_n={top_n}, batch_size={batch_size}")

...
```

### Batch Sending Feedback
```python
logger.info(f"Prepared {len(batches)} message(s) to send to SQS, each with up to {batch_size} movies.")

for idx, batch in enumerate(batches):
    is_last = (idx == len(batches) - 1)
    if not sqs_service.send_batch(batch, is_final_batch=is_last):
        logger.error("Batch sending failed. Aborting.")
        return build_response(500, "Batch sending failed.")
        
...        
```

## Why It Matters

This uniform approach to logging ensures:

- **Traceability**  
  You can follow the step-by-step execution of each Lambda, including inputs, decisions made, and outcomes.

- **Root Cause Analysis**  
  When something fails, logs provide essential insights into what happened, why it failed, and where in the process the issue occurred.

- **CloudWatch Integration**  
  All logs are automatically captured by [Amazon CloudWatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html), allowing monitoring, custom dashboards, log filtering, and alerting.

- **Scalability & Maintenance**  
  As the solution grows, having standardized logging across all components makes it easier to maintain and extend the pipeline without losing visibility.


## Learn More

- [Python Logging Module – Official Documentation](https://docs.python.org/3/library/logging.html)
- [AWS Lambda Logging Guide (Python)](https://docs.aws.amazon.com/lambda/latest/dg/python-logging.html)
- [Using Amazon CloudWatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html)
- [Querying Logs with CloudWatch Logs Insights](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html)
