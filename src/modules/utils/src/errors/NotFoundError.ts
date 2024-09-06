import { NotFoundException } from '@nestjs/common';

/**
 * Not found error with basic show info
 * Detailed info intended for debug
 * is under getDebugMessage() if a record
 * identification was provided
 */
export class NotFoundError extends NotFoundException {
  private item: string;
  private trace: string;
  constructor(item: string, recordInformation?: string) {
    super(`${item} Not Found`);
    this.item = item;
    this.trace = recordInformation ?? '[Info not provided]';
  }

  getItem() {
    return this.item;
  }

  getRecordInfo() {
    return this.trace;
  }

  getDebugMessage() {
    return `Item: ${this.item} with ${this.trace} was not found`;
  }
}
