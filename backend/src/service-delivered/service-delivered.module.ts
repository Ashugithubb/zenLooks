import { Module } from '@nestjs/common';
import { ServiceDeliveredService } from './service-delivered.service';
import { ServiceDeliveredController } from './service-delivered.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceDelivered } from './entities/service-delivered.entity';
import { BookingModule } from 'src/booking/booking.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports:[TypeOrmModule.forFeature([ServiceDelivered]),BookingModule,MailModule],
  controllers: [ServiceDeliveredController],
  providers: [ServiceDeliveredService],
  exports:[ServiceDeliveredService]
})
export class ServiceDeliveredModule {}
