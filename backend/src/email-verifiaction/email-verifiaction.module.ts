import { Module } from '@nestjs/common';
import { EmailVerifiactionService } from './email-verifiaction.service';
import { EmailVerifiactionController } from './email-verifiaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerifiaction } from './entities/email-verifiaction.entity';
import { MailModule } from 'src/mail/mail.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([EmailVerifiaction]),MailModule,UserModule],
  controllers: [EmailVerifiactionController],
  providers: [EmailVerifiactionService],
  
})
export class EmailVerifiactionModule {}
