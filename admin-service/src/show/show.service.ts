import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Show, ShowDocument } from '../db/show.model';
import { CreateShowDto } from './dto/show.dto';

@Injectable()
export class ShowsService {
  constructor(
    @InjectModel(Show.name) private readonly showModel: Model<ShowDocument>,
  ) {}

  // Retrieve all shows
  async getAllShows(): Promise<Show[]> {
    return this.showModel.find().exec();
  }

  // Retrieve a single show by ID
  async getShowById(showId: string): Promise<Show> {
    const show = await this.showModel.findById(showId).exec();
    if (!show) {
      throw new NotFoundException(`Show with ID ${showId} not found`);
    }
    return show;
  }

  // Retrieve all shows by Admin_Id
  async getShowByAdminId(adminId: string): Promise<Show[]> {
    const show = await this.showModel.find({admin_id: adminId}).exec();
    if (!show) {
      throw new NotFoundException(`Show with Admin ID ${adminId} not found`);
    }
    return show;
  }

  // retrieve a single show by movie name
  async getShowByMovie(movie: string): Promise<Show[]> {
    const show = await this.showModel.find({movie: movie}).exec();
    if (!show) {
      throw new NotFoundException(`Show with movie ${movie} not found`);
    }
    return show;
  }

  // Create a new show
  async createShow(createShowDto: CreateShowDto): Promise<Show> {
    const newShow = new this.showModel(createShowDto);
    return newShow.save();
  }

  // Update a show by ID
  async updateShow(
    showId: string,
    updateShowDto: CreateShowDto,
  ): Promise<Show> {
    const updatedShow = await this.showModel
      .findByIdAndUpdate(showId, updateShowDto, { new: true })
      .exec();

    if (!updatedShow) {
      throw new NotFoundException(`Show with ID ${showId} not found`);
    }

    return updatedShow;
  }

  // Delete a show by ID
  async deleteShow(showId: string): Promise<void> {
    const result = await this.showModel.findByIdAndDelete(showId).exec();
    if (!result) {
      throw new NotFoundException(`Show with ID ${showId} not found`);
    }
  }

  // Counts the number of reserved seats for a specific show.
  //  async countReservedSeats(showId: string): Promise<number> {
  //   const show = await this.showModel.findById(showId).exec();
  //   if (!show) {
  //     throw new NotFoundException('Show not found');
  //   }

  //   // Assuming reserved seats are marked with 2
  //   const reservedCount = (show.seats as unknown as number[][]).flat().filter(seat => seat === 2).length;
  //   return reservedCount;
  // }


}

