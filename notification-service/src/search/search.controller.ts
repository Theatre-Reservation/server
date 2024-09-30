import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './search.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // Endpoint to search movies
  @Get('search')
  async searchMovies(@Query('q') query: string) {
    console.log("Received query:", query);  // Log the received query
    if (!query) {
      console.log("No query provided");
      return [];
    }

    const result = await this.moviesService.searchMovies(query);
    console.log("Search result:", result);  // Log the search result
    return result;
  }
}
