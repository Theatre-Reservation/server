import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reservation, ReservationDocument } from '../db/reservation.model';
import { CreateReservationDto } from './dto/reservation.dto';
import { UpdateReservationDto } from './dto/updateReservation.dto';


@Injectable()
export class ReservationService {
    constructor(
        @InjectModel(Reservation.name) private readonly reservationModel: Model<ReservationDocument>
    ) {}

    // Find all reservations
    async findAll(): Promise<Reservation[]> {
        return this.reservationModel.find().exec();
    }

    // Find reservations by movie title
    async findByMovieTitle(movie_title: string): Promise<Reservation[]> {
        return this.reservationModel.find({ movie_title }).exec();
    }

    // Find reservation by ID
    async findById(id: string): Promise<Reservation> {
        const reservation = await this.reservationModel.findById(id).exec();
        if (!reservation) {
            throw new NotFoundException('Reservation not found');
        }
        return reservation;
    }

    // Create a new reservation
    async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
        const newReservation = new this.reservationModel(createReservationDto);
        return newReservation.save();
    }

    // Update an existing reservation
    async update(id: string, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
        const updatedReservation = await this.reservationModel.findByIdAndUpdate(
            id,
            updateReservationDto,
            { new: true }
        ).exec();

        if (!updatedReservation) {
            throw new NotFoundException('Reservation not found');
        }
        return updatedReservation;
    }

    // Delete a reservation
    async delete(id: string): Promise<boolean> {
        const result = await this.reservationModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException('Reservation not found');
        }
        return true;
    }
}
