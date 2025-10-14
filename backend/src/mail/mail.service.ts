import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }
  async sendBookingMail(
    booking: any
  ): Promise<void> {
    try {
      const context = {
        bookingId: booking.bookingId,
        date: booking.date,
        slot: booking.slot,
        phoneNo: booking.phoneNo,
        bookedAt: booking.bookedAt
          ? new Date(booking.bookedAt).toLocaleString()
          : '',
        service: {
          title: booking.service?.title,
          description: booking.service?.description,
          price: booking.service?.price,
          discount: booking.service?.discount,
          imageUrl: booking.service?.imageUrl,
          category: booking.service?.category,
          time: booking.service?.time,
        },
        user: {
          name: booking.user?.name,
          email: booking.user?.email,
        },
        year: new Date().getFullYear(),
      };
      await this.mailerService.sendMail({

        to: booking.user?.email,
        from: process.env.MAIL_USER,
        subject: 'Confirmation of Boooking at ZenLook Salon',
        template: 'emailb',

        context
      });
    } catch (error) {
      console.error('Failed to send NewsLetter email:', error);
    }
  }


  async sendBookingCancelationMail(
    booking: any
  ): Promise<void> {
    try {
      const context = {
        bookingId: booking.bookingId,
        date: booking.date,
        slot: booking.slot,
        phoneNo: booking.phoneNo,
        bookedAt: booking.bookedAt
          ? new Date(booking.bookedAt).toLocaleString()
          : '',
        service: {
          title: booking.service?.title,
          description: booking.service?.description,
          price: booking.service?.price,
          discount: booking.service?.discount,
          imageUrl: booking.service?.imageUrl,
          category: booking.service?.category,
          time: booking.service?.time,
        },
        user: {
          name: booking.user?.name,
          email: booking.user?.email,
        },
        year: new Date().getFullYear(),
      };
      await this.mailerService.sendMail({

        to: booking.user?.email,
        from: process.env.MAIL_USER,
        subject: 'Confirmation of Cancleation of Booking at ZenLook Salon',
        template: 'emailc',

        context
      });
    } catch (error) {
      console.error('Failed to send  email:', error);
    }
  }


}