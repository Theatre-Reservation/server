import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Show, ShowDocument } from '../db/show.model';
import { CreateShowDto } from './dto/show.dto';
// import { Mail, MailDocument } from '../db/mail.model';
@Injectable()
export class ShowsService {
  constructor(
    @InjectModel(Show.name) private readonly showModel: Model<ShowDocument>,
    // @InjectModel(Mail.name) private readonly mailModel: Model<MailDocument>
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

  // Retrieve all shows by Theatre
  async getShowByTheatre(_theater: string): Promise<Show[]> {
    const show = await this.showModel.find({theater: _theater}).exec();
    console.log(_theater);

    if (!show) {
      throw new NotFoundException(`Show with Theatre ${_theater} not found`);
    }
    return show;
  }

  // Retrieve all revenue by Theatre
  async getRevenueByTheatre(theater: string): Promise<number> {
    const shows = await this.showModel.find({theater: theater}).exec();
    if (!shows) {
      console.log("jshadg")
      throw new NotFoundException(`Show with Theater ${theater} not found`);
    }
    let revenue = 0;
    for (let i = 0; i < shows.length; i++) {
        revenue += shows[i].price * (80 - shows[i].available_seats);
        // console.log("revenue", revenue);
      
    }
    // console.log(revenue);
    return revenue;
  }

  // Retreive all booking by theater
  async getBookingByTheatre(theater: string): Promise<number> {
    const shows = await this.showModel.find({theater: theater}).exec();
    if (!shows) {
      throw new NotFoundException(`Show with Theater ${theater} not found`);
    }
    let booking = 0;
    for (let i = 0; i < shows.length; i++) {
        booking += (80 - shows[i].available_seats);
    }
    return booking;
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

  // Get all mail count by movie name
  // async getMailCountByMovie(movie: string): Promise<number> {
  //   const mail = await this.mailModel.find({showName: movie}).exec();
  //   console.log(mail);
  //   if (!mail) {
  //     throw new NotFoundException(`Mail with movie ${movie} not found`);
  //   }
  //   console.log(mail.length);
  //   return mail.length;
  // }

  // // get seat layout by show id
  // async getSeatLayout(showId: string): Promise<Array<Array<number>>> {
  //   const show = await this.showModel.findById(showId).exec();
  //   if (!show) {
  //     throw new NotFoundException(`Show with ID ${showId} not found`);
  //   }
  //   return show.seats;
  // }

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

