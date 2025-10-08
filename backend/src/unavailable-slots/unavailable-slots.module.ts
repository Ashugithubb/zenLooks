import { Module } from '@nestjs/common';
import { UnavailableSlotsService } from './unavailable-slots.service';
import { UnavailableSlotsController } from './unavailable-slots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnavailableSlot } from './entities/unavailable-slot.entity';
import { UnavailableSlotRepository } from './repository/unavailable-slots';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([UnavailableSlot]),UserModule],
  controllers: [UnavailableSlotsController],
  providers: [UnavailableSlotsService,UnavailableSlotRepository],
})
export class UnavailableSlotsModule {}
