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

    @IsNotEmpty()
    theater_id: Types.ObjectId;
}

export class CreateShowDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    img_url: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    genre: string;

    @IsNumber()
    @IsNotEmpty()
    duration: number; // duration in minutes

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ScheduleDto)
    schedules: ScheduleDto[];
}
