import { forwardRef, Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { BookingRepository } from './repository/booking.repo';
import { UserModule } from '../user/user.module';
import { ServicesModule } from '../services/services.module';
import { UnavailableSlotsModule } from '../unavailable-slots/unavailable-slots.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports:[TypeOrmModule.forFeature([Booking]),  forwardRef(()=>ServicesModule) ,
  MailModule, UserModule,UnavailableSlotsModule],
  controllers: [BookingController],
  providers: [BookingService,BookingRepository],
  exports:[BookingService,BookingRepository]
})
export class BookingModule {}
