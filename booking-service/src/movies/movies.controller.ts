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

  @Get(':genre')
  async getMoviesByGenre(@Param('genre') genre: string): Promise<Movie[]> {
    return this.moviesService.getMoviesByGenre(genre);
  }
}
