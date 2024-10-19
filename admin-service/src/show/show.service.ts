import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
async getShowByTheatre(theatre: string, startDate: string, endDate: string): Promise<Show[]> {
    // Convert the startDate and endDate to Date objects
    const start = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0));
    const end = new Date(new Date(endDate).setUTCHours(23, 59, 59, 999));

    console.log('Start Date: ', start);
    console.log('End Date: ', end);
    // Find shows that match the theater and whose schedules fall within the date range
    const shows = await this.showModel.find({
        theater: theatre,
        created_at: { 
            $gte: start,
            $lte: end,
        }
    }).exec();

    console.log('Shows: ', shows);

    if (!shows || shows.length === 0) {
        throw new NotFoundException(`No shows found for Theatre ${theatre} in the specified date range`);
    }

    return shows;
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

  async applyDiscount(showId: string, discountData: { percentage?: number; amount?: number; expiry?: Date }): Promise<Show> {
    const show: ShowDocument = await this.showModel.findById(showId).exec();
    if (!show) {
        throw new NotFoundException(`Show with ID ${showId} not found`);
    }

    // Check if the discount is expired
    console.log(discountData.expiry < new Date())
        // Check if the discount expiry date is provided
    if (discountData.expiry) {
        const expiryDate = new Date(discountData.expiry); // Convert expiry to Date object
        const currentDate = new Date(); // Get the current date

        // Check if the expiry date is in the past
        if (expiryDate < currentDate) {
            console.log("The discount has expired.");
            throw new BadRequestException(`Cannot apply discount; current discount has expired.`);
        }
    }
    console.log("percentage", discountData.percentage);

    let discountPrice = 0;
    if (discountData.percentage) {
            show.discountPercentage = discountData.percentage;
            show.discountAmount = undefined; // Clear fixed discount if percentage is applied
            discountPrice = show.price * (discountData.percentage / 100);
            console.log("discountPrice", discountPrice);
            show.price = show.price - discountPrice;
    } else if (discountData.amount) {
            show.discountAmount = discountData.amount;
            show.discountPercentage = undefined; // Clear percentage discount if fixed amount is applied
            discountPrice = discountData.amount;
            show.price = show.price - discountPrice;
    }

        // Set the discount expiry date if provided
    if (discountData.expiry) {
        show.discountExpiry = new Date(discountData.expiry); // Ensure it's a Date object
    }
    console.log(show)
        return show;
    }

     catch (error) {
        console.error('Error applying discount:', error); // Log the error for debugging
        if (error instanceof NotFoundException || error instanceof BadRequestException) {
            throw error; // Rethrow known exceptions
        } else {
            throw new InternalServerErrorException('Failed to apply discount');
        }
  }

}

