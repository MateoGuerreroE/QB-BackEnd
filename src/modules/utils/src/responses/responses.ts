export class ApplicationResponse {
  data: Record<string, any>;
  statusCode: number;
  constructor(data: Record<string, any>, statusCode: number) {
    this.data = data;
    this.statusCode = statusCode;
  }
}

export class ErrorResponse {
  message: string;
  statusCode: number;
  trace?: any;
  constructor(message: string, statusCode: number = 500, trace?: any) {
    this.message = message;
    this.statusCode = statusCode;
    this.trace = trace;
  }
}
