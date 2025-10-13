import { isEnum, IsEnum, IsOptional, IsString } from "class-validator"
import { Role } from "../enum/user.role"

export class CreateUserDto {

    @IsString()
    email: string

    @IsString()
    name: string

    @IsString()
    password: string

    @IsString()
    @IsOptional()
    firebase:string

    @IsOptional()
    @IsEnum(Role)
    role: Role
}
