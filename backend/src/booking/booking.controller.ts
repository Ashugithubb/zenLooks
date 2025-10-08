import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth';
import { GetBookingQueryDto } from './dto/query.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // @UseGuards(JwtAuthGuard)
  // @Post(":id")
  // create(@Param("id") id:number,@Body() createBookingDto: CreateBookingDto,@Req() req) {
  //   const userId = req.user.userId;
  //   return this.bookingService.create(createBookingDto,userId,id);
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query:GetBookingQueryDto,@Req() req) {
    const userId = req.user.id;
    const role = req.user.role;
    return this.bookingService.findAllBookings(query,userId,role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
