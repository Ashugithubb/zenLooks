import { PartialType } from '@nestjs/mapped-types';
import { CreateUnavailableSlotDto } from './create-unavailable-slot.dto';

export class UpdateUnavailableSlotDto extends PartialType(CreateUnavailableSlotDto) {}
