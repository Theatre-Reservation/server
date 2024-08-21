// src/movies/movies.controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.schema';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getAllMovies(): Promise<Movie[]> {
    return this.moviesService.getAllMovies();
  }

  @Get(':main_genre')
  async getMoviesByMainGenre(@Param('main_genre') main_genre: string): Promise<Movie[]> {
    return this.moviesService.getMoviesByMainGenre(main_genre);
  }

  @Get('limited/5-different-genres')
  async getFiveMoviesFromDifferentGenres(): Promise<Movie[]> {
    return this.moviesService.getFiveMoviesFromDifferentGenres();
  }
}
