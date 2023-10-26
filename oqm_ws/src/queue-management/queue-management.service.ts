import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagementService {
  private queueController = {};

  createQueue(serviceId: number) {
    this.queueController[serviceId] = 0;
    console.log("created:"+serviceId)
  }

  addUserToQueue(serviceId: number) {
    console.log("before:"+this.queueController[serviceId]);
    if (this.queueController[serviceId] === undefined)
      throw new HttpException('Queue does not exist', HttpStatus.BAD_REQUEST);
    this.queueController[serviceId] += 1;
    console.log("after:"+this.queueController[serviceId]);
    return this.queueController[serviceId];
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
