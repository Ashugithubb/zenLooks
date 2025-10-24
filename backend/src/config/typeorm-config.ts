import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../../src/user/entities/user.entity';
import { Service } from '../../src/services/entities/service.entity';
import { Booking } from '../booking/entities/booking.entity';
import { UnavailableSlot } from '../../src/unavailable-slots/entities/unavailable-slot.entity';
import { ServiceDelivered } from '../../src/service-delivered/entities/service-delivered.entity';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    url: configService.get<string>('DATABASE_URL'),
    entities: [User, Service, Booking, UnavailableSlot, ServiceDelivered],
    synchronize: true,
    autoLoadEntities: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
};