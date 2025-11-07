import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HasingModule } from '../hasing/hasing.module';
import { BookingModule } from '../booking/booking.module';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';



@Module({
  imports:[TypeOrmModule.forFeature([User]),HasingModule,forwardRef(()=>AuthModule)],
  controllers: [UserController],
  providers: [UserService,UserRepository],
  exports:[UserService,UserRepository]
})
export class UserModule {}
