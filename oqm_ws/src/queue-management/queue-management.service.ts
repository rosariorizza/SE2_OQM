import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagementService {
  private queueController = {};

  createQueue(serviceId: number) {
    this.queueController[serviceId] = 0;
  }

  addUserToQueue(serviceId: number) {
    if (this.queueController[serviceId] === undefined)
      throw new HttpException('Queue does not exist', HttpStatus.BAD_REQUEST);
    this.queueController[serviceId] += 1;
  }

  removeUserFromQueue(serviceId: number) {
    if (this.queueController[serviceId] === undefined)
      throw new HttpException('Queue does not exist', HttpStatus.BAD_REQUEST);
    this.queueController[serviceId] -= 1;
  }

  removeQueue(serviceId: number) {
    delete this.queueController[serviceId];
  }

  getQueues() {
    return this.queueController;
  }

  getQueueByServiceId(serviceId: number) {
    return this.queueController[serviceId];
  }
}
