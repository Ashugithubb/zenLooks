import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceDeliveredService } from './service-delivered.service';
import { CreateServiceDeliveredDto } from './dto/create-service-delivered.dto';
import { UpdateServiceDeliveredDto } from './dto/update-service-delivered.dto';

@Controller('service-delivered')
export class ServiceDeliveredController {
  constructor(private readonly serviceDeliveredService: ServiceDeliveredService) {}

  @Post()
  create(@Body() createServiceDeliveredDto: CreateServiceDeliveredDto) {
    return this.serviceDeliveredService.create(createServiceDeliveredDto);
  }

  @Post('/verify')
  enteredOtp(@Body()createServiceDeliveredDto:CreateServiceDeliveredDto) {
    return this.serviceDeliveredService.verifyOtp(createServiceDeliveredDto);
  }


  @Get()
  findAll() {
    return this.serviceDeliveredService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceDeliveredService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDeliveredDto: UpdateServiceDeliveredDto) {
    return this.serviceDeliveredService.update(+id, updateServiceDeliveredDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceDeliveredService.remove(+id);
  }
}
