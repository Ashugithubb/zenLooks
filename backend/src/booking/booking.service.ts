import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingRepository } from './repository/booking.repo';
import { UserService } from 'src/user/user.service';
import { ServicesService } from 'src/services/services.service';
import { GetBookingQueryDto } from './dto/query.dto';
import { Role } from 'src/user/enum/user.role';
import { ServiceRepository } from 'src/services/repository/service.repo';

@Injectable()
export class BookingService {
  constructor(private readonly bookingRepo: BookingRepository,
    private readonly userService: UserService,
    @Inject(forwardRef(() => ServicesService))
    private readonly serviceService: ServicesService,
    private readonly serviceRepo: ServiceRepository

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
    return await this.bookingRepo.save(newBooking);
  }




  async allBookings(query: GetBookingQueryDto) {
    const { page = 1, limit = 5, search, category, slot, startDate, endDate } = query;
    const qb = this.bookingRepo
      .createQueryBuilder("bookings")
      .leftJoinAndSelect("bookings.service", "services")
      .leftJoinAndSelect("bookings.user", "users");
    if (search) {
      qb.andWhere(
        "(services.title ILIKE :search OR services.description ILIKE :search)",
        { search: `%${search}%` }
      );
    }
    if (category) {
      qb.andWhere("services.category = :category", { category });
    }
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

    return {
      total,
      page,
      limit,
      bookings,
    };
  }


  async findAllBookings(query: GetBookingQueryDto, userId: number, role: Role) {
    if (role === Role.ADMIN) {
      return await this.allBookings(query);
    }

    const { page = 1, limit = 5, search, category, slot, startDate, endDate } = query;

    const qb = this.bookingRepo
      .createQueryBuilder("bookings")
      .leftJoinAndSelect("bookings.service", "services")
      .leftJoinAndSelect("bookings.user", "users");

    qb.andWhere("users.userId = :userId", { userId });

    if (search) {
      qb.andWhere(
        "(services.title ILIKE :search OR services.description ILIKE :search)",
        { search: `%${search}%` }
      );
    }
    if (category) {
      qb.andWhere("services.category = :category", { category });
    }

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

    return {
      total,
      page,
      limit,
      bookings,
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




  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
