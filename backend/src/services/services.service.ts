import { Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceRepository } from './repository/service.repo';
import { GetServiceQueryDto } from './dto/query.dto';
import { Role } from '../user/enum/user.role';
import { CreateBookingDto } from '../booking/dto/create-booking.dto';
import { BookingRepository } from '../booking/repository/booking.repo';
import { BookingService } from '../booking/booking.service';
import { UserService } from '../user/user.service';
import { Multer } from 'multer';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth';

@Injectable()
export class ServicesService {
  constructor(private readonly serviceRepo: ServiceRepository,
    private readonly bookingService: BookingService,
    private readonly userService: UserService
  ) { }

  async create(createServiceDto: CreateServiceDto, role: Role) {
    if (role === Role.ADMIN) {
      const { imageUrl } = createServiceDto;
      if (imageUrl.length == 0) {
        createServiceDto.imageUrl = 'https://res.cloudinary.com/dwbvusidd/image/upload/v1761652895/ChatGPT_Image_Oct_9_2025_10_18_07_AM_drfior.png';
      }
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

  @UseGuards(JwtAuthGuard)
  async update(id: number, updateServiceDto: UpdateServiceDto) {
    return await this.serviceRepo.update(id, updateServiceDto);
  }

   @UseGuards(JwtAuthGuard)
  async remove(id: number) {
    return await this.serviceRepo.softDelete(id);
  }

  async bookService(createBookingDto: CreateBookingDto, userId: number, serviceId: number) {

    return await this.bookingService.create(createBookingDto, userId, serviceId);
  }

  async topBookedServices() {
    return await this.bookingService.topBookedServices()
  }


  async uplodImage() {
    const avtarUrl = "";
    return avtarUrl;
  }
  // async uplodImage(file: Multer.File) {
  //   const avtarUrl = 'http://localhost:3001/files/' + file.filename;
  //   return avtarUrl;
  // }
}


