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

  async getFiveMoviesFromDifferentGenres(): Promise<Movie[]> {
    const genres = await this.movieModel.distinct('main_genre').exec();
    const movies: Movie[] = [];

    for (const genre of genres) {
      const movie = await this.movieModel.findOne({ main_genre: genre }).exec();
      if (movie) {
        movies.push(movie);
      }
      if (movies.length === 5) {
        break;
      }
    }

    // If there are less than 5 genres, fill the rest with random movies
    if (movies.length < 5) {
      const remainingMovies = await this.movieModel.find({
        main_genre: { $in: genres },
        _id: { $nin: movies.map((movie) => movie._id) },
      })
        .limit(5 - movies.length)
        .exec();

      movies.push(...remainingMovies);
    }

    return movies;
  }
}
