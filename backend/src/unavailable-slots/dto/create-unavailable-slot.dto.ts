import { Transform } from "class-transformer"
import { IsDate, IsDateString, IsString } from "class-validator"

export class CreateUnavailableSlotDto {

    @IsDateString()
    date: string

    @IsString()
    start_time: string

    @IsString()
    end_time: string

    @IsString()
    reason: string
}
