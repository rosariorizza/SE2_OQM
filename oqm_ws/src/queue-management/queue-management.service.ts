import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class QueueManagementService {
  private queueController = {};
  //the ticket number is unique for the whole office
  private customersGlobalID: number = 0;

  createQueue(serviceId: number) {
    this.queueController[serviceId] = [];
  }

  addUserToQueue(serviceId: number) {
    if (this.queueController[serviceId] === undefined)
      throw new HttpException('Queue does not exist', HttpStatus.BAD_REQUEST);
    //add the global id user to the queue
    this.customersGlobalID++;
    this.queueController[serviceId].push(this.customersGlobalID);
    return this.customersGlobalID;
  }

  callNextUser(counterID: number){
    let serviceId = counterID;
    //find services served by the counter
    return this.removeUserFromQueue(serviceId);
  }

  removeUserFromQueue(serviceId: number) {
    if (this.queueController[serviceId] === undefined)
      throw new HttpException('Queue does not exist', HttpStatus.BAD_REQUEST);
    this.queueController[serviceId].pop();
    return this.queueController[serviceId][this.queueController[serviceId].length];
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
