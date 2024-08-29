import { IsNotEmpty, IsString, IsDate, IsArray } from 'class-validator';

export class CreateReservationDto {
    @IsNotEmpty()
    @IsString()
    reservation_id: string;

    @IsNotEmpty()
    @IsString()
    customer_name: string;

    @IsNotEmpty()
    @IsString()
    movie_title: string;

    @IsNotEmpty()
    @IsDate()
    show_time: Date;

    @IsNotEmpty()
    @IsArray()
    seats: Array<{ seat_number: string; status: string }>;
}


