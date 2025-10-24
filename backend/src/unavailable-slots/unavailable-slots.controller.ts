import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UnavailableSlotsService } from './unavailable-slots.service';
import { CreateUnavailableSlotDto } from './dto/create-unavailable-slot.dto';
import { UpdateUnavailableSlotDto } from './dto/update-unavailable-slot.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.auth';

@Controller('unavailable-slots')
export class UnavailableSlotsController {
  constructor(private readonly unavailableSlotsService: UnavailableSlotsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUnevailableSlotDto: CreateUnavailableSlotDto,@Req() req) {
      const adminId = req.user.userId;
    return this.unavailableSlotsService.create(createUnevailableSlotDto,adminId);
  }

  @Get()
  findAll() {
    return this.unavailableSlotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unavailableSlotsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnavailableSlotDto: UpdateUnavailableSlotDto) {
    return this.unavailableSlotsService.update(+id, updateUnavailableSlotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unavailableSlotsService.remove(+id);
  }
}
