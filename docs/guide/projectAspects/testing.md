# Automated Testing

Automated testing is key to keeping this serverless ETL pipeline reliable and easy to maintain. Since the project depends on external APIs like OMDb and AWS services such as S3, SQS, and Secrets Manager, testing helps catch problems early and ensures everything works as expected—both individually and together. 

This project uses a clear testing strategy with unit tests for specific functions and integration tests to check how components work in real scenarios.
## Testing Strategy

Two main types of tests were implemented:

### 1. Unit Tests

Each internal module (e.g., `IMDBService`, `OMDBService`, `S3Service`) is tested in isolation. These tests validate:

- Core logic
- Data transformations
- Retry mechanisms
- Edge cases

These tests do not require any external AWS resources, allowing for fast execution and quick feedback during development.
- [View Unit Tests Folder](https://github.com/PauloDalsoto/imdb-serverless-etl/tree/main/tests/unit)

### 2. Integration Tests (Mocked)

Interaction between Lambda functions and AWS services is tested using the [`moto`](https://github.com/spulec/moto) library to mock:

- S3 buckets
- SQS queues
- Secrets Manager

These tests ensure that the functions can successfully read from and write to these services without needing actual AWS resources, which speeds up testing and avoids costs.
- [View Integration Tests Folder](https://github.com/PauloDalsoto/imdb-serverless-etl/tree/main/tests/integration)

## Tools Used

- [`pytest`](https://docs.pytest.org/en/latest/) – testing framework
- [`moto`](https://github.com/spulec/moto) – AWS service mocking
- Python’s built-in `unittest.mock` – for patching and mocking internal methods and services

## Learn More

- [Pytest – Official Docs](https://docs.pytest.org/en/latest/)
- [Moto – Mock AWS Services](https://github.com/spulec/moto)
- [Python unittest.mock](https://docs.python.org/3/library/unittest.mock.html)
