import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDeliveredDto } from './create-service-delivered.dto';

export class UpdateServiceDeliveredDto extends PartialType(CreateServiceDeliveredDto) {}
