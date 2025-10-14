import { forwardRef, Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { BookingRepository } from './repository/booking.repo';
import { UserModule } from 'src/user/user.module';
import { ServicesModule } from 'src/services/services.module';
import { UnavailableSlotsModule } from 'src/unavailable-slots/unavailable-slots.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports:[TypeOrmModule.forFeature([Booking]),  forwardRef(()=>ServicesModule) ,
  MailModule, UserModule,UnavailableSlotsModule],
  controllers: [BookingController],
  providers: [BookingService,BookingRepository],
  exports:[BookingService,BookingRepository]
})
export class BookingModule {}
