// src/movies/movies.service.ts

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, Observable } from 'rxjs';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Movie } from './movie.schema';

@Injectable()
export class MoviesService {
  constructor(private readonly httpService: HttpService) {}

  findAll(): Observable<AxiosResponse<any>> {
    return this.httpService.get('http://localhost:8000/api/v1/movies');
  }

   async getMoviesByMainGenre(main_genre: string): Promise<any> {
    const response: Observable<AxiosResponse<any>> = this.httpService.get(
      `http://localhost:8000/api/v1/movies?main_genre=${main_genre}`
    );
    return lastValueFrom(response).then(res => res.data);
  }
    
  async getFiveMoviesFromDifferentGenres(): Promise<any[]> {
    try {
      // Fetch all movies using HttpService
      const response = await lastValueFrom(
        this.httpService.get('http://localhost:8000/api/v1/movies')
      );

      const allMovies = response.data; // Array of movie objects

      // Extract distinct genres from the fetched movies
      const genres = [...new Set(allMovies.map((movie: any) => movie.main_genre))];
      const movies: any[] = [];

      // Pick one movie from each genre until you have 5 movies
      for (const genre of genres) {
        const movie = allMovies.find((movie: any) => movie.main_genre === genre);
        if (movie) {
          movies.push(movie);
        }
        if (movies.length === 5) {
          break;
        }
      }
      return movies;
    } catch (error) {
      console.error('Error fetching movies from different genres:', error.message);
      throw new Error('Failed to fetch movies from different genres');
    }
  }

  // async getFiveMoviesFromDifferentGenres(): Promise<Movie[]> {
  //   const genres = await this.movieModel.distinct('main_genre').exec();
  //   const movies: Movie[] = [];

  //   for (const genre of genres) {
  //     const movie = await this.movieModel.findOne({ main_genre: genre }).exec();
  //     if (movie) {
  //       movies.push(movie);
  //     }
  //     if (movies.length === 5) {
  //       break;
  //     }
  //   }

  //   // If there are less than 5 genres, fill the rest with random movies
  //   if (movies.length < 5) {
  //     const remainingMovies = await this.movieModel.find({
  //       main_genre: { $in: genres },
  //       _id: { $nin: movies.map((movie) => movie._id) },
  //     })
  //       .limit(5 - movies.length)
  //       .exec();

  //     movies.push(...remainingMovies);
  //   }

  //   return movies;
  // }

  getMovie(id: string): Promise<any> {
    const response: Observable<AxiosResponse<any>> = this.httpService.get(
      `http://localhost:8000/api/v1/movies/${id}`
    );
    console.log('response', response);
    return lastValueFrom(response).then(res => res.data);
  }

  // async getMovieById(id: string): Promise<Movie> {
  //   return this.movieModel.findById(id).exec();
  // }
}
