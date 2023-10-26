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

  findAllCounters() {
    return this.countersRepository.find();
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
    const counterServices = await this.counterServicesRepository.find({
      where: { serviceId: id },
      relations: ['counter'],
    });
    return counterServices.map((cs) => ({
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

  async getWaitingTime(id: number) {
    const service = await this.servicesRepository.findOne({
      where: { id },
      relations: ['counterServices', 'counterServices.counter'],
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    const t_r = service.time;
    const n_r = this.queueManagementService.getQueueByServiceId(id);
    const counters = (await this.findAllCounters());
    const countersParameters = [];
    for(let counter of counters){
      const counterId = counter.id;
      const k_i = await this.counterServicesRepository.count({ where: { counterId: counter.id } })
      const s_i_r = await this.counterServicesRepository.findOne({  where: { counterId: counter.id, serviceId: id }}) ? 1:0;

      countersParameters.push({ counterId, k_i, s_i_r });
    }
    
    const estimatedWaitingTime = this.calculateEstimatedWaitingTime(t_r, n_r, countersParameters);
    const hours = estimatedWaitingTime / 60;
    const minutes = estimatedWaitingTime % 60;
    console.log(hours);
    console.log(minutes);

    return { hours: hours, minutes: minutes };
  }

  private calculateEstimatedWaitingTime(t_r: number, n_r: number[], counters: { k_i: number; s_i_r: number }[]) {
    const numCounters = counters.length;

    let sum = 0;
    for (let i = 0; i < numCounters; i++) {
      const k_i = counters[i].k_i;
      const s_i_r = counters[i].s_i_r;
      sum += (1 / k_i) * s_i_r;
    }

    const waitingTime = t_r * ((n_r.length / sum) + 0.5);

    return waitingTime;
  }

  removeServiceFromCounter(serviceId: number, counterId: number) {
    return this.counterServicesRepository.delete({ serviceId, counterId });
  }
}
