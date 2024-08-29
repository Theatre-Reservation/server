// src/movies/movies.controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async All() {
    const response: AxiosResponse<any> = await lastValueFrom(this.moviesService.findAll());
    return response.data;
  }

  @Get(':main_genre')
  async getMoviesByMainGenre(@Param('main_genre') main_genre: string): Promise<Movie[]> {
    return this.moviesService.getMoviesByMainGenre(main_genre);
  }

  @Get('limited/5-different-genres')
  async getFiveMoviesFromDifferentGenres(): Promise<Movie[]> {
    return this.moviesService.getFiveMoviesFromDifferentGenres();
  }

  @Get('single/:id')
  async getMovieById(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.getMovieById(id);
  }

  @Get('title/:title')
  async getMovieByTitle(@Param('title') title: string): Promise<Movie | null> {
    return this.moviesService.getMovieByTitle(title);
  }
}
