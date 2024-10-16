import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SearchDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  main_genre: string;

  @Prop({ type: [String], required: true })
  sub_genres: string[];

  @Prop({ required: true })
  poster_path: string;

  @Prop({ required: true })
  cover_path: string;

  @Prop({ required: true })
  released_date: Date;

  @Prop({ required: true })
  runtime: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
