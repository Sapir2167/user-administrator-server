import retry from "retry";

export async function executeWithRetry<T>(operation: () => Promise<T>): Promise<T> {
  const operationWithRetry = retry.operation({
    retries: 3,
    minTimeout: 1000,
    maxTimeout: 30000,
  });

  return new Promise((resolve, reject) => {
    operationWithRetry.attempt(async (currentAttempt) => {
      try {
        const result = await operation();
        resolve(result);
      } catch (error) {
        if (isRetryableError(error)) {
          if (operationWithRetry.retry(error as Error)) {
            console.log(`Retry attempt ${currentAttempt}`);
            return;
          }
        }
        reject(error);
      }
    });
  });
}

function isRetryableError(error: any): boolean {
  // Check if the error is a connection-related error
  if (error.code === "PROTOCOL_CONNECTION_LOST" || error.code === "ECONNREFUSED") {
    return true;
  }
  return false;
}
