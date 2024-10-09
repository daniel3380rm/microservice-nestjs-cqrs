import logger from './logger';

export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number,
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        logger.error(`All retry attempts failed`, { error });
        throw error;
      }
      logger.warn(`Retry attempt ${attempt} failed, retrying...`, { error });
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
  throw new Error('Unexpected error in retry function');
}
