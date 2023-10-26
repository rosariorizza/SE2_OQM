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

  @Get(':servicename')
  getTime(@Param('servicename') servicename:string) {
    //find time using servicename
    return {hour:1, minutes:1};
  }

  @Post()
  createQueues(@Body() createQueuesDto: CreateQueuesDto) {
    let i: number = 0;
    while (i < createQueuesDto.ids.length){
      this.queueService.createQueue(+createQueuesDto.ids[i]);
      i++;
    }
    return createQueuesDto.ids.length;
  }

  @Put(':id')
  add(@Param('id') id: number) {
    return this.queueService.addUserToQueue(+id);
  }

  @Delete(':counterId/next') // Add /next to the route for delete
  remove(@Param('counterId') counterId: number) {
    return this.queueService.callNextUser(counterId);
  }

  
}
