import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;  // Reference to the User model

  @Prop({ required: true })
  userName: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Movie', required: true })
  movieId: MongooseSchema.Types.ObjectId;  // Reference to the Movie model

  @Prop({ required: true })
  comment: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;  // Timestamp of the review creation

  @Prop({
    type: Date,
    default: () => new Date(new Date().setHours(0, 0, 0, 0)),
  })
  createdAtDate: Date;  // Date part of the review creation timestamp
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
