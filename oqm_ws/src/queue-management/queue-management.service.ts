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
<<<<<<< HEAD
    this.queueController[serviceId].add(userId);
=======
    this.queueController[serviceId] += 1;
    return this.queueController[serviceId];
>>>>>>> 636679dcdfbeb9c4d3d8451d60c30ff3a256ba4b
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
