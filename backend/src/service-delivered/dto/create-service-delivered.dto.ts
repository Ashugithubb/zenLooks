import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateServiceDeliveredDto {
    @IsNumber()
    id:number
    
    @IsString()
    @IsOptional()
    otp?:string
}
