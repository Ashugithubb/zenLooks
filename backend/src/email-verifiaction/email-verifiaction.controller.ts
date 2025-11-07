import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailVerifiactionService } from './email-verifiaction.service';
import { CreateEmailVerifiactionDto } from './dto/create-email-verifiaction.dto';
import { UpdateEmailVerifiactionDto } from './dto/update-email-verifiaction.dto';
import { VerifyOtpDto } from './dto/verify-otp';

@Controller('email-verifiaction')
export class EmailVerifiactionController {
  constructor(private readonly emailVerifiactionService: EmailVerifiactionService) { }

  @Post()
  create(@Body() createEmailVerifiactionDto: CreateEmailVerifiactionDto) {
    return this.emailVerifiactionService.create(createEmailVerifiactionDto);
  }

  @Post("/otp")
  verifyOtp(@Body() dto:VerifyOtpDto) {
      return this.emailVerifiactionService.verifyOtp(dto);
  }
}
