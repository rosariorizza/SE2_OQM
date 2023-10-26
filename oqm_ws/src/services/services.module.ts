import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './entities/service.entity';
import { CounterServiceEntity } from './entities/counter-service.entity';
import { CounterEntity } from './entities/counter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceEntity,
      CounterServiceEntity,
      CounterEntity,
    ]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
