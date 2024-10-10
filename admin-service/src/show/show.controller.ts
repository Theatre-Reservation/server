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
  @Get(':movie')
  async getShowByMovie(@Param('movie') movie: string): Promise<Show[]> {
    const show = await this.showsService.getShowByMovie(movie);
    if (!show) {
      throw new NotFoundException(`Show with movie ${movie} not found`);
    }
    return show;
  }

  // Retrieve all shows by Theatre
  @Get('admin/theater')
  async getShowByTheatre(@Query('theater') theater: string): Promise<Show[]> {
    const show = await this.showsService.getShowByTheatre(theater);
    if (!show) {
      throw new NotFoundException(`Show with Theatre ${theater} not found`);
    }
    return show;
  }

  // Retrieve all revenue by Theatre
  @Get('admin/revenue')
  async getRevenueByTheatre(@Query('theater') theater: string): Promise<number> {
    const show = await this.showsService.getRevenueByTheatre(theater);
    console.log(show);
    return show;
  }

  // Retrieve all booking by Theatre
  @Get('admin/booking')
  async getBookingByTheatre(@Query('theater') theater: string): Promise<number> {
    const booking = await this.showsService.getBookingByTheatre(theater);
    console.log(booking);
    return booking;
  }

  // Retrieve all mail count by show
  // @Get('admin/user')
  // async getUsersByShow(@Query('show') show: string): Promise<number> {
  //   const mail = await this.showsService.getMailCountByMovie(show);
  //   console.log(mail);
  //   return mail;
  // }


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

  // Delete a show by ID
  @Delete(':id')
  async deleteShow(@Param('id') showId: string): Promise<void> {
    return this.showsService.deleteShow(showId);
  }

}
