import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceEntity } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CounterServiceEntity } from './entities/counter-service.entity';
import { CounterEntity } from './entities/counter.entity';
import { QueueManagementService } from 'src/queue-management/queue-management.service';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly servicesRepository: Repository<ServiceEntity>,
    @InjectRepository(CounterEntity)
    private readonly countersRepository: Repository<CounterEntity>,
    @InjectRepository(CounterServiceEntity)
    private readonly counterServicesRepository: Repository<CounterServiceEntity>,
    private readonly queueManagementService: QueueManagementService,
  ) {}

  create(createServiceDto: CreateServiceDto) {
    return this.servicesRepository.save(createServiceDto);
  }

  async findAll(counterId?: number) {
    if (counterId) {
      const counter = await this.countersRepository.findOne({
        where: { id: counterId },
        relations: ['counterServices', 'counterServices.service'],
      });

      if (!counter) {
        throw new NotFoundException(`Counter with ID ${counterId} not found`);
      }

      return counter.counterServices.map((cs) => ({
        id: cs.service.id,
        description: cs.service.description,
        type: cs.service.type,
        time: cs.service.time,
      }));
    } else {
      return this.servicesRepository.find();
    }
  }

  findOne(id: number) {
    return this.servicesRepository.findOne({ where: { id } });
  }

  async findCounterForService(id: number) {
    const service = await this.servicesRepository.findOne({
      where: { id },
      relations: ['counterServices', 'counterServices.counter'],
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return service.counterServices.map((cs) => ({
      id: cs.counter.id,
      description: cs.counter.description,
      type: cs.counter.type,
    }));
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return this.servicesRepository.update(id, updateServiceDto);
  }

  remove(id: number) {
    return this.servicesRepository.delete(id);
  }

  assignServiceToCounter(serviceId: number, counterId: number) {
    return this.counterServicesRepository.save({ serviceId, counterId });
  }

  async getWaitingTime(id: number) { //qua dovrebbe prendere in input un servizio, non l'id soltanto
    const service = await this.servicesRepository.findOne({
      where: { id },
      relations: ['counterServices', 'counterServices.counter'],
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    const t_r = service.time;
    const n_r = this.queueManagementService.getQueueByServiceId(id);
    const k_i = this.findAll()


    /*const counters = service.counterServices.map((cs) => ({
      k_i: cs.counter.counterServices.length, // number of different types of requests served by counter i
      s_i_r: cs.counter.counterServices.some((cs) => cs.service.id === id) ? 1 : 0,
    }));

    const estimatedWaitingTime = this.calculateEstimatedWaitingTime(t_r, n_r, counters);
    //console.log(estimatedWaitingTime);

    return { estimatedWaitingTime };
  }

  private calculateEstimatedWaitingTime(t_r: number, n_r: number, counters: { k_i: number; s_i_r: number }[]) {
    const numCounters = counters.length;
    console.log(numCounters);

    let sum = 0;
    for (let i = 0; i < numCounters; i++) {
      const k_i = counters[i].k_i;
      const s_i_r = counters[i].s_i_r;
      sum += 1 / (k_i * s_i_r);
    }

    const waitingTime = t_r * (n_r / (sum + 0.5));
    return waitingTime;
    */
  }
}
