// import {
//   Controller,
//   Get,
//   Post,
//   Patch,
//   Delete,
//   Param,
//   Body,
//   NotFoundException,
// } from '@nestjs/common';
// import { ShowsService } from './show.service';
// import { Show } from '../db/show.model';
// import { CreateShowDto } from './dto/show.dto';

// @Controller('shows')
// export class ShowsController {
//   constructor(private readonly showsService: ShowsService) {}

//   // Create a new show
//   @Post()
//   async createShow(@Body() createShowDto: CreateShowDto): Promise<Show> {
//     return this.showsService.createShow(createShowDto);
//   }

//   // Retrieve all shows
//   @Get()
//   async getAllShows(): Promise<Show[]> {
//     return this.showsService.getAllShows();
//   }

//   // Retrieve a single show by ID
//   @Get(':id')
//   async getShowById(@Param('id') showId: string): Promise<Show> {
//     const show = await this.showsService.getShowById(showId);
//     if (!show) {
//       throw new NotFoundException(`Show with ID ${showId} not found`);
//     }
//     return show;
//   }

//   // Update a show by ID
//   @Patch(':id')
//   async updateShow(
//     @Param('id') showId: string,
//     @Body() updateShowDto: CreateShowDto,
//   ): Promise<Show> {
//     return this.showsService.updateShow(showId, updateShowDto);
//   }

//   // Delete a show by ID
//   @Delete(':id')
//   async deleteShow(@Param('id') showId: string): Promise<void> {
//     return this.showsService.deleteShow(showId);
//   }

//   // Reserve seats for a show
//   @Patch(':id/reserve')
//   async reserveSeats(
//     @Param('id') showId: string,
//     @Body('seats') seats: string[],
//   ): Promise<Show> {
//     return this.showsService.reserveSeats(showId, seats);
//   }

//   // Temporarily reserve seats
//   @Patch(':id/temporarily-reserve')
//   async temporarilyReserveSeats(
//     @Param('id') showId: string,
//     @Body('seats') seats: string[],
//   ): Promise<Show> {
//     return this.showsService.temporarilyReserveSeats(showId, seats);
//   }

//   // Clear temporary reservations
//   @Patch(':id/clear-temporary-reservations')
//   async clearTemporaryReservations(@Param('id') showId: string): Promise<Show> {
//     return this.showsService.clearTemporaryReservations(showId);
//   }
// }
