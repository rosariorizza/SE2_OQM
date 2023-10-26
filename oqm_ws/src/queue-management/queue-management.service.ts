import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CounterServiceEntity } from './entities/counter-service.entity';
import { ServiceEntity } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QueueManagementService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly servicesRepository: Repository<ServiceEntity>,
    @InjectRepository(CounterServiceEntity)
    private readonly counterServicesRepository: Repository<CounterServiceEntity>,
  ) {}

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

  async callNextUser(counterId: number){
    /*
    let serviceIds = await this.counterServicesRepository.find({
      where: { counterId: counterId },
    });
    ...
    console.log(serviceIds);
    //find services served by the counter
    console.log("CounterID:")
    */
    return this.removeUserFromQueue(counterId);
  }

  removeUserFromQueue(serviceId: number) {
    if (this.queueController[serviceId] === undefined)
      throw new HttpException('Queue does not exist', HttpStatus.BAD_REQUEST);
    this.queueController[serviceId].pop();
    if ((this.queueController[serviceId]).length != 0)
      return (this.queueController[serviceId])[this.queueController[serviceId].length-1];
    else 
      return 0;
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
