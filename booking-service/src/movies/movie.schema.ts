// src/movies/schemas/movie.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Movie extends Document {
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