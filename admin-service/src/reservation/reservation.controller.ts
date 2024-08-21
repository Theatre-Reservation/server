import { Controller, Get, Post, Put, Delete, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto} from './dto/reservation.dto';
import { UpdateReservationDto } from './dto/updateReservation.dto';
import { Reservation } from '../db/reservation.model';

@Controller('reservations')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}

    // Get all reservations
    @Get()
    async getAllReservations(@Query('movie_title') movie_title?: string) {
        if (movie_title) {
            return this.reservationService.findByMovieTitle(movie_title);
        }
        return this.reservationService.findAll();
    }

    // Get a reservation by ID
    @Get(':id')
    async getReservationById(@Param('id') id: string) {
        const reservation = await this.reservationService.findById(id);
        if (!reservation) {
            throw new BadRequestException('Reservation not found');
        }
        return reservation;
    }

    // Create a new reservation
    @Post()
    async createReservation(@Body() createReservationDto: CreateReservationDto) {
        return this.reservationService.create(createReservationDto);
    }

    // Update an existing reservation
    @Put(':id')
    async updateReservation(
        @Param('id') id: string,
        @Body() updateReservationDto: UpdateReservationDto
    ) {
        const updatedReservation = await this.reservationService.update(id, updateReservationDto);
        if (!updatedReservation) {
            throw new BadRequestException('Reservation not found');
        }
        return updatedReservation;
    }

    // Delete a reservation
    @Delete(':id')
    async deleteReservation(@Param('id') id: string) {
        const result = await this.reservationService.delete(id);
        if (!result) {
            throw new BadRequestException('Reservation not found');
        }
        return { message: 'Reservation deleted successfully' };
    }
}
