import { forwardRef, Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ServiceRepository } from './repository/service.repo';
import { BookingModule } from '../booking/booking.module';
import { UserModule } from '../user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Service]),forwardRef(()=>BookingModule),UserModule],
  controllers: [ServicesController],
  providers: [ServicesService,ServiceRepository],
  exports:[ServicesService,ServiceRepository],
})
export class ServicesModule {}
