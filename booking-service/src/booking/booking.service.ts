import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Show, ShowDocument } from './show.schema';

@Injectable()
export class BookingService {
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
}
