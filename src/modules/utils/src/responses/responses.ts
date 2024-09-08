import { HttpException, HttpStatus } from '@nestjs/common';

export class ApplicationResponse<T extends object = {}> extends Response {
  data: Record<string, any>;
  statusCode: number;
  metadata?: Record<string, any>;
  constructor(
    data: T | T[],
    statusCode: number,
    metadata?: Record<string, any>,
  ) {
    super();
    this.data = data;
    this.statusCode = statusCode;
    this.metadata = metadata;
  }
}

export class ErrorResponse extends HttpException {
  message: string;
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
