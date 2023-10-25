import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagementService {
  private queueController = {};

  createQueue(serviceId: number) {
    this.queueController[serviceId] = new Set();
  }

  addUserToQueue(serviceId: number, userId: number) {
    if (!this.queueController[serviceId])
      throw new HttpException('Queue does not exist', HttpStatus.BAD_REQUEST);
    this.queueController[serviceId].add(userId);
  }

  removeUserFromQueue(serviceId: number, userId: number) {
    if (!this.queueController[serviceId])
      throw new HttpException('Queue does not exist', HttpStatus.BAD_REQUEST);
    this.queueController[serviceId].delete(userId);
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
