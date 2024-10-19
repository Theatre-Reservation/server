import { Body, Controller, Get, Param, Patch, Query, Post } from '@nestjs/common';
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

  @Patch('update-seats/:id')
  async updateSeats(
    @Param('id') id: string,
    @Body('reservedSeats') reservedSeats: string[],
  ): Promise<Show | null> {
    return this.bookingService.updateSeats(id, reservedSeats);
  }

  @Patch('lock-seats/:id')
  async lockSeats(
    @Param('id') id: string,
    @Body('temporaryReservedSeats') temporaryReservedSeats: string[],
  ): Promise<Show | null> {
    return this.bookingService.lockSeats(id, temporaryReservedSeats);
  }

  @Patch('release-seats/:id')
  async releaseSpecificSeats(
    @Param('id') id: string,
    @Body('seatsToRelease') seatsToRelease: string[],
  ): Promise<Show | null> {
    return this.bookingService.releaseSpecificSeats(id, seatsToRelease);
  }

  // **New Endpoint: POST /booking/release-seats**
  @Post('release-seats')
  async releaseSeats(
    @Body('showId') showId: string,
    @Body('seatsToRelease') seatsToRelease: string[],
  ): Promise<{ message: string } | { message: string }> {
    const updatedShow = await this.bookingService.releaseSeats(showId, seatsToRelease);
    if (updatedShow) {
      return { message: 'Seats released successfully.' };
    } else {
      return { message: 'Failed to release seats. Show not found.' };
    }
  }

  /**
 * **New Endpoint: Get Loyalty Points**
 * GET /booking/loyalty-points/:userId
 * Retrieves the available loyalty points for a user.
 */
  @Get('loyalty-points/:userId')
  async getLoyaltyPoints(@Param('userId') userId: string): Promise<{ loyaltyPoints: number } | { message: string }> {
    const points = await this.bookingService.getLoyaltyPoints(userId);
    if (points !== null) {
      return { loyaltyPoints: points };
    } else {
      return { message: 'User not found.' };
    }
  }

  /**
   * **New Endpoint: Update Loyalty Points**
   * PATCH /booking/loyalty-points/:userId
   * Adds loyalty points to a user's account.
   * Expects a JSON body with a `points` field indicating the number of points to add.
   */
  @Patch('loyalty-points/:userId')
  async updateLoyaltyPoints(
      @Param('userId') userId: string,
      @Body() updatePointsDto: { points: number }
  ) {
      const updatedUser = await this.bookingService.updateLoyaltyPoints(userId, updatePointsDto.points);
      return {
          message: 'Loyalty points updated successfully. New balance: ${updatedUser.loyaltyPoints} points.',
          newBalance: updatedUser.loyaltyPoints,
      };
  }
}
