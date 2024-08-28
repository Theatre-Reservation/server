import { Controller, Get, Param, Query } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Show } from './show.schema';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('by-movie')
  async getShowsByMovieTitle(@Query('movieTitle') movieTitle: string): Promise<Show[]> {
    return this.bookingService.getShowsByMovieTitle(movieTitle);
  }

  @Get('by-theater')
  async getShowsByTheaterName(
    @Query('theaterName') theaterName: string,
    @Query('movieTitle') movieTitle: string,
  ): Promise<Show[]> {
    return this.bookingService.getShowsByTheaterName(theaterName, movieTitle);
  }

  @Get('by-price')
  async getShowsByPrice(@Query('maxPrice') maxPrice: number): Promise<Show[]> {
    return this.bookingService.getShowsByPrice(maxPrice);
  }

  @Get('by-movie-max-price')
  async getShowsWithMaxPriceByMovie(@Query('movieTitle') movieTitle: string): Promise<Show[]> {
    return this.bookingService.getShowsWithMaxPriceByMovie(movieTitle);
  }

  @Get('by-movie-date')
  async getShowsByMovieAndDate(
    @Query('movieTitle') movieTitle: string,
    @Query('date') date: string,
  ): Promise<Show[]> {
    return this.bookingService.getShowsByMovieAndDate(movieTitle, date);
  }

  @Get('single/:id')
  async getShowById(@Param('id') id: string): Promise<Show | null> {
    return this.bookingService.getShowById(id);
  }
}
