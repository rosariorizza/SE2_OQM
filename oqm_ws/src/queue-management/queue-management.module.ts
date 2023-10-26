import { Module } from '@nestjs/common';
import { QueueManagementService } from './queue-management.service';
import { QueueManagementController } from './queue-management.controller';
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
    ])],
  controllers: [QueueManagementController],
  providers: [QueueManagementService],
  exports: [QueueManagementService],
})
export class QueueManagementModule {}
