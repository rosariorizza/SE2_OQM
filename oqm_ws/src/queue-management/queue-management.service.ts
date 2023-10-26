import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceEntity } from '../services/entities/service.entity';
import { CounterServiceEntity } from '../services/entities/counter-service.entity';
import { CounterEntity } from '../services/entities/counter.entity';

@Injectable()
export class QueueManagementService {
  constructor(
  ) {}

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
