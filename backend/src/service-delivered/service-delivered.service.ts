import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDeliveredDto } from './dto/create-service-delivered.dto';
import { UpdateServiceDeliveredDto } from './dto/update-service-delivered.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceDelivered } from './entities/service-delivered.entity';
import { Repository } from 'typeorm';
import { BookingService } from '../booking/booking.service';
import { MailService } from '../mail/mail.service';
import { BookingStatus } from '../booking/enum/payement.status';
import { BookingRepository } from '../booking/repository/booking.repo';

@Injectable()
export class ServiceDeliveredService {
  constructor(@InjectRepository(ServiceDelivered) private readonly serviceDeleviredRepo: Repository<ServiceDelivered>,
    private readonly bookingService: BookingService,
    private readonly mailService: MailService,
    private bookingRepository: BookingRepository) { }

  async create(createServiceDeliveredDto: CreateServiceDeliveredDto) {
    const { id } = createServiceDeliveredDto;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const booking = await this.bookingService.findOne(id);

    if (!booking) throw new NotFoundException();

    const newServiceDelivery = this.serviceDeleviredRepo.create({
      booking,
      otp,
    })
    const userName = booking.user.name;
    const email = booking.user.email
    await this.mailService.sendOtpToUser(otp, userName, email)
    await this.serviceDeleviredRepo.save(newServiceDelivery);
  }


  async verifyOtp(createServiceDeliveredDto: CreateServiceDeliveredDto) {
    const { id, otp } = createServiceDeliveredDto;
    const booking = await this.bookingService.findOne(id);

    if (!booking) throw new NotFoundException()

    const latestOtp = await this.serviceDeleviredRepo.findOne({
      where: {
        booking: { bookingId: id },
      },
      order: {
        createdAt: 'DESC',
      },
    });
    if (!latestOtp) throw new NotFoundException();

    if (otp === latestOtp.otp) {
      await this.serviceDeleviredRepo.update(latestOtp.id, { verified: true });
      await this.bookingRepository.update(booking.bookingId, { bookingStatus: BookingStatus.COMPLETED });
      return { msg: "OTP Verified" };
    } else {
      return { msg: "Invalid OTP", verified: false };
    }
  }

  findAll() {
    return `This action returns all serviceDelivered`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceDelivered`;
  }

  update(id: number, updateServiceDeliveredDto: UpdateServiceDeliveredDto) {
    return `This action updates a #${id} serviceDelivered`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceDelivered`;
  }
}
