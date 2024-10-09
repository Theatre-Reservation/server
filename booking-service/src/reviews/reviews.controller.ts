import { Controller, Get, Post, Body, Param, BadRequestException } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './review.schema';
import { Types } from 'mongoose';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // Get all reviews for a specific movie
  @Get('movie/:movieId')
  async getReviewsByMovie(@Param('movieId') movieId: string): Promise<Review[]> {
    if (!Types.ObjectId.isValid(movieId)) {
      throw new BadRequestException('Invalid movie ID');
    }
    return this.reviewsService.getReviewsByMovie(movieId);
  }

  // Add a new review
  @Post()
  async addReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewsService.addReview(createReviewDto);
  }
}
