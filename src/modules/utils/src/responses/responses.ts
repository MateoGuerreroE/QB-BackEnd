import { HttpException, HttpStatus } from '@nestjs/common';

export class ApplicationResponse<T extends object = {}> extends Response {
  data: Record<string, any>;
  statusCode: number;
  constructor(data: T | T[], statusCode: number) {
    super();
    this.data = data;
    this.statusCode = statusCode;
  }
}

export class ErrorResponse extends HttpException {
  privatemessage: string;
  statusCode: number;
  trace?: any;

  constructor(
    message: string,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    trace?: any,
  ) {
    super(message, statusCode);
    this.message = message;
    this.statusCode = statusCode;
    this.trace = trace;
  }
}

export type ControllerResponse = ApplicationResponse | ErrorResponse;
