import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './review.schema';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>) {}

  // Get all reviews for a specific movie, sorted by newest first
  async getReviewsByMovie(movieId: string): Promise<Review[]> {
    return this.reviewModel
      .find({ movieId: new Types.ObjectId(movieId) })
      .sort({ createdAt: -1 }) // Newest first
      .exec();
  }

  // Add a new review
  async addReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const newReview = new this.reviewModel(createReviewDto);
    return newReview.save();
  }
}
