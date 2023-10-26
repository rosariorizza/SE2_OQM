import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Body
} from '@nestjs/common';
import { QueueManagementService } from './queue-management.service';
import { CreateQueuesDto } from './dto/create-queues.dto';

@Controller() // Set a common route prefix for these endpoints: /api/queue
export class QueueManagementController {
  constructor(private readonly queueService: QueueManagementService) {}

  @Post()
  createQueues(@Body() createQueuesDto: CreateQueuesDto) {
    for (let current_id in createQueuesDto.ids){
      this.queueService.createQueue(+current_id);
    }
    return createQueuesDto.ids.length;
  }

  @Put(':id')
  add(@Param('id') id: number) {
    return this.queueService.addUserToQueue(+id);
  }

  @Delete(':counterId/next') // Add /next to the route for delete
  remove(@Param('counterId') counterId: number) {
    return this.queueService.removeUserFromQueue(counterId);
  }

  
}
