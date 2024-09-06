import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * General purpose application error
 *
 * @description Can take a custom message to display
 * as error.message. If details is passed as an argument
 * the message attribute will be an object.
 *
 * Although this receives a custom status code, please use other
 * custom errors for specific cases, leave this error for
 * the unclassified cases
 *
 * Access separate through getMessage or getDetails in that case
 */
export class ApplicationError extends HttpException {
  constructor(
    message = 'Internal Server Error',
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    private details?: any,
  ) {
    super(details ? { details, message } : message, statusCode);
  }

  getMessage() {
    return this.message;
  }

  getDetails() {
    return this.details;
  }
}
