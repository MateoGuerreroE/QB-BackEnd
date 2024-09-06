import { hexIdRegex } from './regex';

export const isValidHexId = (id: string): boolean => {
  return hexIdRegex.test(id);
};
