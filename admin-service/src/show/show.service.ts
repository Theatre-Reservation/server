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

  // Retrieve all shows based on Theatre and movie names
  async getShowByTheatreAndMovie(
    _theater: string,
    _movie: string,
  ): Promise<Show[]> {
    const show = await this.showModel
      // .find({ theater: _theater, movie: _movie })
      .find({theater: { $regex: new RegExp(_theater, 'i') }, // case-insensitive search
      movie: { $regex: new RegExp(_movie, 'i') }}, // case-insensitive search
      )
      .exec();
    if (!show) {
      throw new NotFoundException(
        `Show with Theatre ${_theater} and Movie ${_movie} not found`,
      );
    }
    return show;
  }

  // Retrieve all shows by Theatre
  async getShowByTheatre(_theater: string): Promise<Show[]> {
    const show = await this.showModel.find({theater: _theater}).exec();
    console.log(_theater);

    if (!show) {
      throw new NotFoundException(`Show with Theatre ${_theater} not found`);
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

  // update show seats
  async updateShowSeats(showId: string, seats: Array<Array<number>>): Promise<Show> {
    const updatedShow = await this.showModel
      .findByIdAndUpdate(showId, {seats: seats}, { new: true })
      .exec();

    if (!updatedShow) {
      throw new NotFoundException(`Show with ID ${showId} not found`);
    }

    return updatedShow;
  }

  // get set by show id
  async getSeats(showId: string): Promise<any> {
    const show = await this.showModel.findById
    (showId).exec();
    if (!show) {
      throw new NotFoundException(`Show with ID ${showId} not found`);
    }
    return show.seats;
  }

  // Delete a show by ID
  async deleteShow(showId: string): Promise<void> {
    const result = await this.showModel.findByIdAndDelete(showId).exec();
    if (!result) {
      throw new NotFoundException(`Show with ID ${showId} not found`);
    }
  }

}

