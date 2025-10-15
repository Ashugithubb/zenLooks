import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { PaymentStatus } from "../enum/payement.status";

export class CreateBookingDto {
    @IsDateString()
    date: string

    @IsString()
    slot: string

    @IsString()
    phoneNo: string

    @IsEnum(PaymentStatus)
    @IsOptional()
    paymentStatus?: PaymentStatus;
}
