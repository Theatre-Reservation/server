import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Show, ShowDocument } from './show.schema';

@Injectable()
export class BookingService {
  static releaseExpiredSeats: any;
  constructor(
    @InjectModel(Show.name) private showModel: Model<ShowDocument>,
  ) {}

  async getShowsByMovieTitle(movieTitle: string): Promise<Show[]> {
    return this.showModel.find({ movie: movieTitle }).exec();
  }

  async getShowsByTheaterName(theaterName: string, movieTitle: string): Promise<Show[]> {
    return this.showModel.find({ theater: theaterName, movie: movieTitle }).exec();
  }

  async getShowsByPrice(maxPrice: number): Promise<Show[]> {
    return this.showModel.find({ price: { $lte: maxPrice } }).exec();
  }

  async getShowsWithMaxPriceByMovie(movieTitle: string): Promise<Show[]> {
    // Find the maximum price for the given movie
    const shows = await this.showModel.find({ movie: movieTitle }).exec();
    const maxPrice = Math.max(...shows.map(show => show.price));
    
    // Return shows that match the maximum price
    return this.showModel.find({ movie: movieTitle, price: maxPrice }).exec();
  }

  async getShowsByMovieAndDate(movieTitle: string, date: string): Promise<Show[]> {
    return this.showModel.find({ movie: movieTitle, date: date }).exec();
  }

  async getShowById(id: string): Promise<Show | null> {
    return this.showModel.findById(id).exec();
  }

  async updateSeats(id: string, reservedSeats: string[]): Promise<Show | null> {

  // Find the show by ID
  const show = await this.showModel.findById(id).exec();
  
  if (!show) {
    return null; // Show not found
  }

  // Combine the existing reserved seats with the new ones
  const updatedReservedSeats = [...new Set([...show.reserved_seats, ...reservedSeats])];

  // Calculate the number of available seats
  const availableSeats = show.seats.length - updatedReservedSeats.length;

  // Update the show document
  show.reserved_seats = updatedReservedSeats;
  show.available_seats = availableSeats;
  show.updated_at = new Date();

  // Save the updated document
  return show.save();
  }

  async lockSeats(id: string, temporaryReservedSeats: string[]): Promise<Show | null> {
    const show = await this.showModel.findById(id).exec();

    if (!show) {
        return null;
    }

    // Combine existing temporary reserved seats with new ones
    const updatedTemporaryReservedSeats = [...new Set([...show.temporary_reserved_seats, ...temporaryReservedSeats])];

    // Update the show document
    show.temporary_reserved_seats = updatedTemporaryReservedSeats;
  
    return show.save();
  }

  async releaseSpecificSeats(id: string, seatsToRelease: string[]): Promise<Show | null> {
    const show = await this.showModel.findById(id).exec();

    if (!show) {
        return null;
    }

    // Remove only the specified seats from temporary_reserved_seats
    const updatedTemporaryReservedSeats = show.temporary_reserved_seats.filter(
        (seat) => !seatsToRelease.includes(seat)
    );

    // Update the show document
    show.temporary_reserved_seats = updatedTemporaryReservedSeats;
    show.updated_at = new Date();

    return show.save();
  }
}
