import { IsArray, IsBoolean, IsDateString, IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { boolean } from 'zod';
import { Category } from 'src/services/enum/category.enum';



export class GetBookingQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit?: number = 10;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsEnum(Category)
    category?: Category

    @IsOptional()
    @Transform(({ value }) => {
        const date = new Date(value);
        return isNaN(date.getTime()) ? undefined : date.toISOString();
    })
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @Transform(({ value }) => {
        const date = new Date(value);
        return isNaN(date.getTime()) ? undefined : date.toISOString();
    })
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsString()
    slot?: string;
}