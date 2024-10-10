import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateReviewDto {
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  movieId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
