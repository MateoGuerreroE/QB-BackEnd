import { ApplicationError } from '../errors';
import { hexIdRegex } from './regex';

export const isValidHexId = (id: string, name?: string): void => {
  const isValid = hexIdRegex.test(id);
  if (!isValid) {
    throw new ApplicationError(`Invalid id${' ' + name}`);
  }
};
