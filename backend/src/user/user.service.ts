import { ConflictException, ForbiddenException, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from './repository/user.repo';
import { error } from 'console';
import { HasingService } from 'src/hasing/hasing.service';
import { CreateBookingDto } from 'src/booking/dto/create-booking.dto';
import { BookingService } from 'src/booking/booking.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository,
              private readonly hasingRepo:HasingService,
  ) { }


  async create(createUserDto: CreateUserDto){
    const { email,password } = createUserDto;
    createUserDto.password = await this.hasingRepo.hashPassword(password);

    const existingUser = await this.userRepo.findOneBy({ email });

    if (existingUser) throw new ConflictException();

    await this.userRepo.save(createUserDto);
    return {"msg":"User Registred Successfully"}
  }



  async findOneByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }
 async  findOne(id: number) {
    return await this.userRepo.findOneBy({userId:id});}


  

  findAll() {
    return `This action returns all user`;
  }



  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
