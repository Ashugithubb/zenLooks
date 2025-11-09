import { ConflictException, ForbiddenException, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from './repository/user.repo';
import { error } from 'console';
import { HasingService } from '../hasing/hasing.service';
import { CreateBookingDto } from '../booking/dto/create-booking.dto';
import { BookingService } from '../booking/booking.service';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';

import { MailService } from '../mail/mail.service';
@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository,
    private readonly hasingRepo: HasingService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) { }



  async create(createUserDto: CreateUserDto, res: Response) {
    const { email, password } = createUserDto;
    const existing = await this.userRepo.findOneBy({ email });
    if (existing) throw new ForbiddenException("already exists");
    createUserDto.password = await this.hasingRepo.hashPassword(password);

    const existingUser = await this.userRepo.findOneBy({ email });

    if (existingUser) {
      throw new ConflictException();
    }

    const user = await this.userRepo.save(createUserDto);

    if (createUserDto.firebase) {
      const payload = { id: user.userId, email: user.email, role: user.role };
      await this.authService.login(payload, res);
    }
    return { "msg": "User Registred Successfully" }
  }



  async findOneByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }
  async findOne(id: number) {
    return await this.userRepo.findOneBy({ userId: id });
  }


  async update(updateUserDto: UpdateUserDto) {
     const { email, password } = updateUserDto;
       updateUserDto.password = await this.hasingRepo.hashPassword(password!);
    await this.userRepo.update({ email: updateUserDto.email }, updateUserDto);

    return { "msg": "Paasword reset  Successfully" }
  }



  findAll() {
    return `This action returns all user`;
  }





  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
