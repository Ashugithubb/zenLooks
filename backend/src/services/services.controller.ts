import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { GetServiceQueryDto } from './dto/query.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth';
import { CreateBookingDto } from 'src/booking/dto/create-booking.dto';
import { BookingService } from 'src/booking/booking.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { File as MulterFile } from 'multer';


@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createServiceDto: CreateServiceDto, @Req() req) {
    const role = req.user.role;
    return this.servicesService.create(createServiceDto, role);
  }

  @Get()
  findAll(@Query() query: GetServiceQueryDto) {
    return this.servicesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id/booking")
  bookService(@Param("id") id: number, @Body() createBookingDto: CreateBookingDto, @Req() req) {
    const userId = req.user.userId;
    return this.servicesService.bookService(createBookingDto, userId, id);
  }
  @Get("/top/three")
  topBookedServices() {

    return this.servicesService.topBookedServices();
  }


  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        callback(null, `${file.fieldname}-${uniqueSuffix}-${extname(file.originalname)}`)
      }
    })
  }))
  async uploadFile(@UploadedFile(new ParseFilePipe({
    fileIsRequired: true,
  })) file: MulterFile) {
    return this.servicesService.uplodImage(file);
  }
}




