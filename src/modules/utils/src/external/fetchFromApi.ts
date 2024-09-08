import axios from 'axios';
import { ApplicationError } from '../errors';

export async function fetchFromApi<T>(
  url: string,
  path: string,
  apiKey: string,
  additionalParams?: Record<string, string>,
  headers?: Record<string, string>,
): Promise<T> {
  try {
    const keyPath = `api_key=${apiKey}`;
    const paramsPath = Object.keys(additionalParams)
      .map((key) => `${key}=${additionalParams[key]}`)
      .join('&');
    const constructUrl = `${url}/${path}?${keyPath}&${paramsPath}`;
    const result = await axios.get<T>(constructUrl, { headers });
    return result.data;
  } catch (error: any) {
    if (error instanceof ApplicationError) {
      throw error;
    }
    throw new ApplicationError(`Unable to fetch: ${error.message}`);
  }
}
