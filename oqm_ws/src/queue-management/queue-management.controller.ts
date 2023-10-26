import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { QueueManagementService } from './queue-management.service';

@Controller() // Set a common route prefix for these endpoints: /api/queue
export class QueueManagementController {
  constructor(private readonly queueService: QueueManagementService) {}

  @Put(':id')
  create(@Param('id') id: number) {
    return this.queueService.addUserToQueue(+id);
  }

  @Delete(':counterId/next') // Add /next to the route for delete
  remove(@Param('counterId') counterId: number) {
    return this.queueService.removeUserFromQueue(counterId);
  }
}
