# Error Handling and Retry Logic

In a serverless data pipeline that interacts with external services and APIs, errors such as network failures, timeouts, or rate limiting can happen at any time. Handling these errors properly is essential to keep the pipeline reliable and to prevent data loss or inconsistent states.

## How the pipeline Handles Errors

To address this, the project implements a **retry logic with exponential backoff** to handle transient failures gracefully. This approach retries the failed operation several times, waiting longer between attempts, reducing the risk of failing due to temporary issues.

## Retry Function

A reusable function called `with_retries` manages retry attempts. It logs each retry attempt, waits exponentially longer between tries, and raises an exception if all retries fail.

```python
import time

def with_retries(logger, max_retries, base_delay, func, description, *args, **kwargs):
    for attempt in range(max_retries):
        try:
            logger.info(f"{description} - Attempt {attempt + 1}")
            return func(*args, **kwargs)
        except Exception as e:
            logger.warning(f"{description} failed on attempt {attempt + 1}: {e}")
            time.sleep(base_delay * (2 ** attempt))
    logger.error(f"{description} failed after {max_retries} retries.")
    raise Exception(f"{description} failed after {max_retries} retries.")
```

The `with_retries` function is designed to run another function multiple times until it succeeds or the maximum number of retry attempts is reached.

- It receives a function `func` to execute, along with its positional arguments (`*args`) and keyword arguments (`**kwargs`).
- The function tries to run `func(*args, **kwargs)` inside a loop up to `max_retries` times.
- If `func` raises an exception, `with_retries` catches it, logs a warning with the attempt number, and waits for a delay before retrying.
- The delay grows exponentially with each attempt (called exponential backoff), calculated as `base_delay * (2 ** attempt)`.
- If all attempts fail, `with_retries` logs an error and raises an exception to indicate failure.

### What are `*args` and `**kwargs`?
- `*args` allows passing a variable number of positional arguments to the function `func`.
- `**kwargs` allows passing a variable number of keyword arguments (named parameters) to `func`.

### Example Usage
Here is an example of using with_retries to safely fetch data from an external API:

```python
def _fetch(self, url):
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    return response.json()

def fetch_movie_data(self):
    return with_retries(
        self.logger,
        self.max_retries,
        self.base_delay,
        self._fetch,
        f"Fetching data from: {self.url}",
        self.url
    )

# Into GetMoviesAndSendToQueue Lambda Function
try:
    logger.info("Fetching movie data from IMDB service.")
    data = imdb_service.fetch_movie_data()
except Exception as e:
    logger.error(f"Error fetching movie data: {e}")
    return build_response(500, "Failed to fetch movie data.")
```

By applying this structured retry mechanism, the pipeline improves its resilience against intermittent failures and external service interruptions, ensuring smoother and more reliable data processing.