import { IsString, IsDate, IsArray, IsOptional } from 'class-validator';

export class UpdateReservationDto {
    @IsOptional()
    @IsString()
    reservation_id?: string;

    @IsOptional()
    @IsString()
    customer_name?: string;

    @IsOptional()
    @IsString()
    movie_title?: string;

    @IsOptional()
    @IsDate()
    show_time?: Date;

    @IsOptional()
    @IsArray()
    seats?: Array<{ seat_number: string; status: string }>;
}
