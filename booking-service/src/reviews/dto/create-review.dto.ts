import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import sanitizeHtml from 'sanitize-html';

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

  sanitizeInput() {
    this.userName = sanitizeHtml(this.userName);
    this.comment = sanitizeHtml(this.comment);
  }
}
