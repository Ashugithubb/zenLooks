import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { Service } from '../services/entities/service.entity';
import { Booking } from '../booking/entities/booking.entity';
import { UnavailableSlot } from '../unavailable-slots/entities/unavailable-slot.entity';
import { ServiceDelivered } from '../service-delivered/entities/service-delivered.entity';
import { EmailVerifiaction } from '../email-verifiaction/entities/email-verifiaction.entity';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    url: configService.get<string>('DATABASE_URL'),
    entities: [User, Service, Booking, UnavailableSlot, ServiceDelivered,EmailVerifiaction],
    synchronize: true,
    autoLoadEntities: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
};