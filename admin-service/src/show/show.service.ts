// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Show, ShowDocument } from '../db/show.model';
// import { CreateShowDto } from './dto/show.dto';
// // import { UpdateShowDto } from './dto/update-show.dto';

// @Injectable()
// export class ShowsService {
//   constructor(
//     @InjectModel(Show.name) private readonly showModel: Model<ShowDocument>,
//   ) {}

//   // Create a new show
//   async createShow(createShowDto: CreateShowDto): Promise<Show> {
//     const createdShow = new this.showModel(createShowDto);
//     return createdShow.save();
//   }

//   // Retrieve all shows
//   async getAllShows(): Promise<Show[]> {
//     return this.showModel.find().exec();
//   }

//   // Retrieve a single show by ID
//   async getShowById(showId: string): Promise<Show> {
//     const show = await this.showModel.findById(showId).exec();
//     if (!show) {
//       throw new NotFoundException(`Show with ID ${showId} not found`);
//     }
//     return show;
//   }

//   // Update a show by ID
//   async updateShow(showId: string, updateShowDto: CreateShowDto): Promise<Show> {
//     const updatedShow = await this.showModel
//       .findByIdAndUpdate(showId, updateShowDto, { new: true })
//       .exec();
//     if (!updatedShow) {
//       throw new NotFoundException(`Show with ID ${showId} not found`);
//     }
//     return updatedShow;
//   }

//   // Delete a show by ID
//   async deleteShow(showId: string): Promise<void> {
//     const result = await this.showModel.findByIdAndDelete(showId).exec();
//     if (!result) {
//       throw new NotFoundException(`Show with ID ${showId} not found`);
//     }
//   }

//   // Reserve seats for a show
//   async reserveSeats(showId: string, seats: string[]): Promise<Show> {
//     const show = await this.getShowById(showId);
//     const alreadyReservedSeats = show.reserved_seats.concat(show.temporary_reserved_seats);
//     const invalidSeats = seats.filter(seat => alreadyReservedSeats.includes(seat));

//     if (invalidSeats.length > 0) {
//       throw new Error(`Seats ${invalidSeats.join(', ')} are already reserved or temporarily reserved`);
//     }

//     show.reserved_seats.push(...seats);
//     show.available_seats -= seats.length;

//     return show.save();
//   }

//   // Temporarily reserve seats
//   async temporarilyReserveSeats(showId: string, seats: string[]): Promise<Show> {
//     const show = await this.getShowById(showId);
//     const alreadyReservedSeats = show.reserved_seats.concat(show.temporary_reserved_seats);
//     const invalidSeats = seats.filter(seat => alreadyReservedSeats.includes(seat));

//     if (invalidSeats.length > 0) {
//       throw new Error(`Seats ${invalidSeats.join(', ')} are already reserved or temporarily reserved`);
//     }

//     show.temporary_reserved_seats.push(...seats);
//     return show.save();
//   }

//   // Clear temporary reservations (could be used with a scheduled job)
//   async clearTemporaryReservations(showId: string): Promise<Show> {
//     const show = await this.getShowById(showId);
//     show.temporary_reserved_seats = [];
//     return show.save();
//   }
// }
