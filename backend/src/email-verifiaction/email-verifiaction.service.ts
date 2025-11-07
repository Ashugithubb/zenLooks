import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmailVerifiactionDto } from './dto/create-email-verifiaction.dto';
import { UpdateEmailVerifiactionDto } from './dto/update-email-verifiaction.dto';
import { MailService } from 'src/mail/mail.service';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { VerifyOtpDto } from './dto/verify-otp';
import { EmailVerifiaction } from './entities/email-verifiaction.entity';
import { UserRepository } from 'src/user/repository/user.repo';

@Injectable()
export class EmailVerifiactionService {
  constructor(
    @InjectRepository(EmailVerifiaction) private readonly emailVerificationRepo: Repository<EmailVerifiaction>,
    private readonly mailService: MailService,
    private readonly userRepo:UserRepository) { }

  async create(createEmailVerifiactionDto: CreateEmailVerifiactionDto) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const { name, email } = createEmailVerifiactionDto;

    const user =    await this.userRepo.findOneBy({email});

    if(user) throw new ConflictException("This email Already Exists");

    await this.emailVerificationRepo.save({email,otp});
    await this.mailService.sendOtpEmail( email,name, otp);
  }


  async verifyOtp(dto: VerifyOtpDto) {
    const { email, otp } = dto;
    const latestOtp = await this.emailVerificationRepo.findOne({
      where: { email },
      order: { createdAt: 'DESC' },
    });
    if (!latestOtp) throw new NotFoundException('No OTP found for this email');

    if (otp === latestOtp.otp){
      return { msg: "OTP Verified" };
    }
    throw new BadRequestException("Invalid Otp");
  }


}



