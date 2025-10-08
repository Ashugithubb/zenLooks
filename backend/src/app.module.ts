import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ServicesModule } from './services/services.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm-config';
import { BookingModule } from './booking/booking.module';
import { UnavailableSlotsModule } from './unavailable-slots/unavailable-slots.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRootAsync(typeOrmConfig),UserModule, ServicesModule, 
    BookingModule, UnavailableSlotsModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
