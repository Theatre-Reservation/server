import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { Types } from 'mongoose';

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    admin_id: Types.ObjectId;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    poster_path: string;

    @IsString()
    @IsNotEmpty()
    venue: string;

    @IsDate()
    @IsNotEmpty()
    date: Date;

    @IsString()
    @IsNotEmpty()
    time: string;

    @IsNumber()
    @IsNotEmpty()
    runtime: number;

    @IsString()
    @IsNotEmpty()
    price: String;

}


    