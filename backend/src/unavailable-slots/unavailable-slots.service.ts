import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnavailableSlotDto } from './dto/create-unavailable-slot.dto';
import { UpdateUnavailableSlotDto } from './dto/update-unavailable-slot.dto';
import { UnavailableSlotRepository } from './repository/unavailable-slots';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UnavailableSlotsService {
  constructor(private readonly unavailableSlotRepo :UnavailableSlotRepository,
              private readonly userService : UserService
   ){}

  async create(createUnavailableSlotDto: CreateUnavailableSlotDto,adminId:number) {
      const admin = await this.userService.findOne(adminId);
      if(!admin) throw new NotFoundException();

      const newSlot = this.unavailableSlotRepo.create({
        ...createUnavailableSlotDto,
       user:admin
      })
    return await this.unavailableSlotRepo.save(createUnavailableSlotDto);
  }



  findAll() {
    return `This action returns all unavailableSlots`;
  }


  findOne(id: number) {
    return `This action returns a #${id} unavailableSlot`;
  }

  update(id: number, updateUnavailableSlotDto: UpdateUnavailableSlotDto) {
    return `This action updates a #${id} unavailableSlot`;
  }

  remove(id: number) {
    return `This action removes a #${id} unavailableSlot`;
  }
}
