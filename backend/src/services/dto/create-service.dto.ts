import { IsEnum, IsInt, IsOptional, IsString } from "class-validator"
import { Category } from "../enum/category.enum"

export class CreateServiceDto {

    @IsString()
    title: string

    @IsString()
    description: string

    @IsInt()
    price: number

    @IsInt()
    time: number

    @IsOptional()
    @IsInt()
    discount: number

    @IsEnum(Category)
    category:Category

    @IsString()
    imageUrl: string

}
