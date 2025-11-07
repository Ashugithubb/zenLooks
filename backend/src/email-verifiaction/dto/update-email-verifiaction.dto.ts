import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailVerifiactionDto } from './create-email-verifiaction.dto';

export class UpdateEmailVerifiactionDto extends PartialType(CreateEmailVerifiactionDto) {}
