import { forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingRepository } from './repository/booking.repo';
import { UserService } from '../user/user.service';
import { ServicesService } from '../services/services.service';
import { GetBookingQueryDto } from './dto/query.dto';
import { Role } from '../user/enum/user.role';
import { ServiceRepository } from '../services/repository/service.repo';
import { UnavailableSlotsService } from '../unavailable-slots/unavailable-slots.service';
import dayjs from 'dayjs'
import { UnavailableSlotRepository } from '../unavailable-slots/repository/unavailable-slots';
import { MailService } from '../mail/mail.service';
import { In } from 'typeorm';

@Injectable()
export class BookingService {
  constructor(private readonly bookingRepo: BookingRepository,
    private readonly userService: UserService,
    @Inject(forwardRef(() => ServicesService))
    private readonly serviceService: ServicesService,
    private readonly serviceRepo: ServiceRepository,
    private readonly unavilabeService: UnavailableSlotsService,
    private readonly unavilableRepo: UnavailableSlotRepository,
    private readonly mailService: MailService

  ) { }

  async create(createBookingDto: CreateBookingDto, userId: number, serviceId: number) {
    const user = await this.userService.findOne(userId);

    const service = await this.serviceService.findOne(serviceId);

    if (!user || !service) throw new NotFoundException("user or service not found");

    const newBooking = this.bookingRepo.create({
      ...createBookingDto,
      user,
      service
    })

    const booking = await this.bookingRepo.save(newBooking);
    const { date, slot } = createBookingDto;

    const bookingDate = dayjs(date).format("YYYY-MM-DD");

    const startTime = dayjs(`${bookingDate}T${slot}`);
    if (!startTime.isValid()) throw new Error("Invalid start time");

    const endTime = startTime.add(booking.service.time, "minute").format("HH:mm");

    await this.unavilabeService.create({
      date: bookingDate,
      start_time: startTime.format("HH:mm"),
      end_time: endTime,
      reason: "Booked slot"
    }, userId);

    console.log("calling mail service");
    await this.mailService.sendBookingMail(booking)

  }


  async allBookings(query: GetBookingQueryDto) {
    const { page = 1, limit = 5, search, category, slot, startDate, endDate } = query;

    const qb = this.bookingRepo
      .createQueryBuilder("bookings")
      .leftJoinAndSelect("bookings.user", "users")
      .withDeleted()
      .orderBy('bookings.bookingId', 'DESC')



    if (slot) {
      qb.andWhere("bookings.slot = :slot", { slot });
    }

    if (startDate && endDate) {
      qb.andWhere("bookings.date BETWEEN :start AND :end", {
        start: startDate,
        end: endDate,
      });
    } else if (startDate) {
      qb.andWhere("bookings.date >= :start", { start: startDate });
    } else if (endDate) {
      qb.andWhere("bookings.date <= :end", { end: endDate });
    }


    const [bookings, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    if (!bookings.length) {
      return { total, page, limit, bookings: [] };
    }


    const bookingIds = bookings.map((b) => b.bookingId);

    const result = await this.bookingRepo.find({
      where: { bookingId: In(bookingIds) },
      relations: ["service", "user"],
      withDeleted: true,
    });

    const orderedResult = bookingIds.map(
      id => result.find(b => b.bookingId === id)!
    );
    let filteredResult = orderedResult;
    if (category) {
      filteredResult = result.filter(
        (b) => b.service?.category === category
      );
    }

    if (search) {
      const lowerSearch = search.toLowerCase();
      filteredResult = filteredResult.filter(
        (b) =>
          b.service?.title?.toLowerCase().includes(lowerSearch) ||
          b.service?.description?.toLowerCase().includes(lowerSearch) ||
          b.phoneNo?.includes(search)
      );
    }

    return {
      total,
      page,
      limit,
      bookings: filteredResult,
    };
  }




  async findAllBookings(query: GetBookingQueryDto, userId: number, role: Role) {

    if (role === Role.ADMIN) {
      return await this.allBookings(query);
    }

    const { page = 1, limit = 5, search, category, slot, startDate, endDate } = query;


    const qb = this.bookingRepo
      .createQueryBuilder("bookings")
      .leftJoinAndSelect("bookings.user", "users")
      .orderBy('bookings.bookingId', 'DESC')

    qb.andWhere("users.userId = :userId", { userId });


    if (slot) {
      qb.andWhere("bookings.slot = :slot", { slot });
    }

    if (startDate && endDate) {
      qb.andWhere("bookings.date BETWEEN :start AND :end", {
        start: startDate,
        end: endDate,
      });
    } else if (startDate) {
      qb.andWhere("bookings.date >= :start", { start: startDate });
    } else if (endDate) {
      qb.andWhere("bookings.date <= :end", { end: endDate });
    }

    const [bookings, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    if (!bookings.length) {
      return { total, page, limit, bookings: [] };
    }

    const bookingIds = bookings.map((b) => b.bookingId);

    const result = await this.bookingRepo.find({
      where: { bookingId: In(bookingIds) },
      relations: ["service", "user"],
      withDeleted: true,
    });

    const orderedResult = bookingIds.map(
      id => result.find(b => b.bookingId === id)!
    );
    let filteredResult = orderedResult;

    if (category) {
      filteredResult = filteredResult.filter(
        (b) => b.service?.category === category
      );

    }

    if (search) {
      filteredResult = filteredResult.filter(
        (b) =>
          b.service?.title?.toLowerCase().includes(search.toLowerCase()) ||
          b.service?.description?.toLowerCase().includes(search.toLowerCase()) ||
          b.phoneNo?.includes(search)
      );
    }
    return {
      total,
      page,
      limit,
      bookings: filteredResult,
    };
  }


  async topBookedServices() {
    const qb = this.bookingRepo
      .createQueryBuilder("bookings")
      .select("bookings.serviceId", "serviceId")
      .addSelect("COUNT(bookings.serviceId)", "bookingCount")
      .innerJoin("bookings.service", "service")
      .groupBy("bookings.serviceId")
      .orderBy(`"bookingCount"`, "DESC")
      .limit(3);

    const topServiceStats = await qb.getRawMany();


    const serviceIds = topServiceStats.map((s) => s.serviceId);


    const services = await this.serviceRepo.findByIds(serviceIds);



    const enrichedServices = services.map(service => {
      const stat = topServiceStats.find(s => s.serviceId === service.serviceId);
      return {
        ...service,
        bookingCount: parseInt(stat?.bookingCount || '0')
      };
    });

    return enrichedServices;
  }

  async remove(id: number) {

    const booking = await this.bookingRepo.findOne({
      where: { bookingId: id },
      relations: ["user", "service"],
      withDeleted: true
    },
    );

    if (!booking) {
      throw new Error('Booking not found');
    }
    const { slot, date } = booking;


    await this.unavilableRepo.delete({
      start_time: slot,
      date,
    });

    await this.bookingRepo.softDelete(id);

    await this.mailService.sendBookingCancelationMail(booking);
  }


  async findOne(id: number) {
    return await this.bookingRepo.findOne({
      where: { bookingId: id },
      relations: ["user"],
    });
  }


  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }


}
