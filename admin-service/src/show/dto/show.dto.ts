import { IsString, IsNotEmpty, IsNumber, IsArray, IsDateString } from 'class-validator';

export class CreateShowDto {
    @IsString()
    @IsNotEmpty()
    movie: string; // Name of the movie

    @IsString()
    @IsNotEmpty()
    theater: string; // Name of the theater

    @IsString()
    @IsNotEmpty()
    date: string; // Date of the show in format (YYYY-MM-DD)

    @IsString()
    @IsNotEmpty()
    time: string; // Time of the show

    @IsNumber()
    @IsNotEmpty()
    price: number; // Price per seat

    // @IsArray()
    // @IsNumber()
    // seats: Array<Array<number>>; // List of all seats

    // @IsArray()
    // @IsString({ each: true })
    // reserved_seats: string[]; // List of reserved seats

    // @IsNumber()
    // @IsNotEmpty()
    // available_seats: number; // Number of available seats

    // @IsDateString()
    // @IsNotEmpty()
    // created_at: Date;

    // @IsDateString()
    // @IsNotEmpty()
    // updated_at: Date;

    // @IsArray()
    // @IsString({ each: true })
    // temporary_reserved_seats: string[]; // List of temporarily reserved seats
}
