// src/movies/movies.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './movie.schema';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async getAllMovies(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async getMoviesByMainGenre(main_genre: string): Promise<Movie[]> {
    return this.movieModel.find({ main_genre }).exec();
  }
}
