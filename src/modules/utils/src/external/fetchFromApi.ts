import axios from 'axios';
import { ApplicationError } from '../errors';

export async function fetchFromApi<T>(
  url: string,
  path: string,
  apiKey?: string,
  headers?: Record<string, string>,
): Promise<T> {
  try {
    const keyPath = apiKey ? `?api_key=${apiKey}` : '';
    console.log(keyPath);
    const constructUrl = `${url}/${path}${keyPath}`;
    console.log(constructUrl);
    const result = await axios.get<T>(constructUrl, { headers });
    return result.data;
  } catch (error: any) {
    if (error instanceof ApplicationError) {
      throw error;
    }
    throw new ApplicationError(`Unable to fetch: ${error.message}`);
  }
}
