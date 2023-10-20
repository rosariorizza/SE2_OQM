import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceEntity } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly servicesRepository: Repository<ServiceEntity>,
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

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return this.servicesRepository.update(id, updateServiceDto);
  }

  remove(id: number) {
    return this.servicesRepository.delete(id);
  }
}
