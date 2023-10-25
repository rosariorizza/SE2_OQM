import { Module } from '@nestjs/common';
import { QueueManagementService } from './queue-management.service';

@Module({
  providers: [QueueManagementService],
  exports: [QueueManagementService],
})
export class QueueManagementModule {}
