import { UnauthorizedException } from '@nestjs/common';

export class UnauthorizedError extends UnauthorizedException {
  private opts?: string;
  constructor(message = 'Unauthorized', opts?: string) {
    super(message);
    this.opts = opts;
  }

  getOptions() {
    return this.opts;
  }

  getDebugMessage() {
    return `Unauthorized: ${this.opts}`;
  }
}
