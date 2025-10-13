import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HasingModule } from 'src/hasing/hasing.module';
import { BookingModule } from 'src/booking/booking.module';
import { AuthModule } from 'src/auth/auth.module';



@Module({
  imports:[TypeOrmModule.forFeature([User]),HasingModule,forwardRef(()=>AuthModule)],
  controllers: [UserController],
  providers: [UserService,UserRepository],
  exports:[UserService]
})
export class UserModule {}
