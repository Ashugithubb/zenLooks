import { IsDateString, IsString } from "class-validator";

export class CreateBookingDto {
    @IsDateString()
    date: string

    @IsString()
    slot: string

    @IsString()
    phoneNo: string
}
