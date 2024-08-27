import { IsString, IsNotEmpty, IsNumber, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

class ScheduleDto {
    @IsDateString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @IsNotEmpty()
    time: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}

export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    admin_id: Types.ObjectId;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    language: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    main_genre: string;

    @IsNumber()
    @IsNotEmpty()
    runtime: number; // runtime in minutes

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ScheduleDto)
    schedules: ScheduleDto[];
}
