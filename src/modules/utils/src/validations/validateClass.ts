import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export async function validateClassComposition<T extends object>(
  targetClass: new () => T,
  objToValidate: Record<string, any>,
): Promise<string[]> {
  const classInstance = plainToInstance(targetClass, objToValidate);

  const validationErrors: ValidationError[] = await validate(classInstance);
  const errors: string[] = [];

  for (const valError of validationErrors) {
    if (valError.constraints) {
      const errorMessages = Object.values(valError.constraints);
      if (errorMessages.length > 0) {
        errors.push(errorMessages[0]);
      }
    }
  }
  return errors;
}
