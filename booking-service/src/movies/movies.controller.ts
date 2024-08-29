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
  async getMoviesByMainGenre(@Param('main_genre') main_genre: string) {
    console.log(`Controller: Fetching movies by main genre: ${main_genre}`);
      return await this.moviesService.getMoviesByMainGenre(main_genre);
  } 

  @Get('five-by-genres')
  async getFiveMoviesFromDifferentGenres(): Promise<any[]> {
      return await this.moviesService.getFiveMoviesFromDifferentGenres();
  }

  // @Get(':id')
  // async getMovie(): Promise<any[]> {
  //   return await this.moviesService.getMovie();
  // }
  
}
