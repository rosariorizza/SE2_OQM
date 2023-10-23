import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceEntity } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CounterServiceEntity } from './entities/counter-service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly servicesRepository: Repository<ServiceEntity>,
    @InjectRepository(CounterServiceEntity)
    private readonly counterServicesRepository: Repository<CounterServiceEntity>,
  ) {}

  create(createServiceDto: CreateServiceDto) {
    return this.servicesRepository.save(createServiceDto);
  }

  findAll() {
    return this.servicesRepository.find();
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
}
