import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller()
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  findAll(@Query('counterId') counterId?: number) {
    return this.servicesService.findAll(counterId);
  }

  @Get(':id/counters')
  findCounterForService(@Param('id') id: number) {
    return this.servicesService.findCounterForService(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.servicesService.findOne(+id);
  }

  @Patch(':id/counters/:counterId')
  assignServiceToCounter(
    @Param('id') id: number,
    @Param('counterId') counterId: number,
  ) {
    return this.servicesService.assignServiceToCounter(+id, counterId);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.servicesService.remove(+id);
  }
}
