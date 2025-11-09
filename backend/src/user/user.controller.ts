import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateBookingDto } from '../booking/dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.auth';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    return this.userService.create(createUserDto, res);
  }

  @Patch()
  update( @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }



  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }





}
