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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { MailModule } from './mail/mail.module';
import { ServiceDeliveredModule } from './service-delivered/service-delivered.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRootAsync(typeOrmConfig), UserModule, ServicesModule,
    BookingModule, UnavailableSlotsModule, AuthModule, ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
      serveRoot: '/files',
    }), MailerModule.forRoot({
      preview:true,
      transport: {
        service: 'gmail',
        port: 1025,
        ignoreTLS: true,
        secure: false,
      
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: '"ZenLook Salon" <no-reply@zenlook.com>',
      },


      template: {
        dir: process.cwd() + '../src/mail/template',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }), MailModule, ServiceDeliveredModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
