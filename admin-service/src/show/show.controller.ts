import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  Query,
  BadRequestException,
  // Query,
} from '@nestjs/common';
import { ShowsService } from './show.service';
import { Show } from '../db/show.model';
import { CreateShowDto } from './dto/show.dto';
import { query } from 'express';
// import { log } from 'console';
// import { query } from 'express';
// import { Transaction } from 'src/db/moviePayment.model';

@Controller('shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  // Retrieve all shows
  @Get()
  async getAllShows(): Promise<Show[]> {
    return this.showsService.getAllShows();
  }

  // Create a new show
  @Post()
  async createShow(@Body() createShowDto: CreateShowDto): Promise<Show> {
    return this.showsService.createShow(createShowDto);
  }

  // Retrieve a single show by ID
  // @Get(':id')
  // async getShowById(@Param('id') showId: string): Promise<Show> {
  //   const show = await this.showsService.getShowById(showId);
  //   if (!show) {
  //     throw new NotFoundException(`Show with ID ${showId} not found`);
  //   }
  //   return show;
  // }

  // retrieve a single show by movie name
  // @Get(':movie')
  // async getShowByMovie(@Param('movie') movie: string): Promise<Show[]> {
  //   const show = await this.showsService.getShowByMovie(movie);
  //   if (!show) {
  //     throw new NotFoundException(`Show with movie ${movie} not found`);
  //   }
  //   return show;
  // }

  // Retrieve all shows based on Theatre and movie names
  @Get('show')
  async getShowByTheatreAndMovie(
    @Query('theater') theater: string,
    @Query('movie') movie: string,
  ): Promise<Show[]> {
    const show = await this.showsService.getShowByTheatreAndMovie(theater, movie);
    if (!show) {
      throw new NotFoundException(
        `Show with Theatre ${theater} and Movie ${movie} not found`,
      );
    }
    return show;
  }

  // Retrieve all shows by Theatre
@Get('admin/theater')
async getShowByTheatre(
    @Query('theater') theater: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
): Promise<Show[]> {
    if (!theater) {
        throw new BadRequestException('Theater is required.');
    }
    if (!startDate || !endDate) {
        throw new BadRequestException('Start date and end date are required.');
    }

    const shows = await this.showsService.getShowByTheatre(theater, startDate, endDate);
    if (!shows || shows.length === 0) {
        throw new NotFoundException(`No shows found for Theatre ${theater} between ${startDate} and ${endDate}`);
    }

    return shows;
}


  @Post(':id/apply-discount')
  async applyDiscount(@Param('id') id: string, @Body() discountData: { percentage?: number; amount?: number; expiry?: Date  }): Promise<Show> {
      return this.showsService.applyDiscount(id, discountData);
  }

  // Update a show by ID
  @Patch(':id')
  async updateShow(
    @Param('id') showId: string,
    @Body() updateShowDto: CreateShowDto,
  ): Promise<Show> {
    return this.showsService.updateShow(showId, updateShowDto);
  }

  // Update seats of a show by ID
  @Patch(':id/seats')
  async updateShowSeats(
    @Param('id') showId: string,
    @Body('seats') seats: Array<Array<number>>,
  ): Promise<Show> {
    return this.showsService.updateShowSeats(showId, seats);
  }

  // get set by show id
  @Get(':id/seats')
  async getSeats(@Param('id') showId: string): Promise<any> {
    return this.showsService.getSeats(showId);
  }


  // Delete a show by ID
  @Delete(':id')
  async deleteShow(@Param('id') showId: string): Promise<void> {
    return this.showsService.deleteShow(showId);
  }

}
