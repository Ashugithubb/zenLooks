import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceRepository } from './repository/service.repo';
import { GetServiceQueryDto } from './dto/query.dto';
import { Role } from 'src/user/enum/user.role';
import { CreateBookingDto } from 'src/booking/dto/create-booking.dto';
import { BookingRepository } from 'src/booking/repository/booking.repo';
import { BookingService } from 'src/booking/booking.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ServicesService {
  constructor(private readonly serviceRepo: ServiceRepository,
    private readonly bookingService: BookingService,
    private readonly userService: UserService
  ) { }

  async create(createServiceDto: CreateServiceDto, role: Role) {
    if (role === Role.ADMIN) {
      return await this.serviceRepo.save(createServiceDto);
    }
    throw new UnauthorizedException("Only Admin can Add Service");
  }


  async findAll(query: GetServiceQueryDto) {
    const { page = 1, limit = 5, search, category } = query;

    const qb = this.serviceRepo.createQueryBuilder('services');

    if (search) {
      qb.andWhere(
        '(services.title ILIKE :search OR services.description ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (category) {
      qb.andWhere('services.category = :category', { category });
    }

    const [services, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      total,
      page,
      limit,
      services,
    };
  }

  async findOne(id: number) {
    return await this.serviceRepo.findOneBy({ serviceId: id })
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    return await this.serviceRepo.update(id, updateServiceDto);
  }

  async remove(id: number) {
    return await this.serviceRepo.softDelete(id);
  }

  async bookService(createBookingDto: CreateBookingDto, userId: number, serviceId: number) {
    return await this.bookingService.create(createBookingDto, userId, serviceId);
  }

  async topBookedServices(){
    return await this.bookingService.topBookedServices()
  }


}
