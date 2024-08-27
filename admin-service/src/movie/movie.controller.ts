import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/movie.dto';
import { Movie } from 'src/db/movie.model';

@Controller('movies')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    // Endpoint to get all movies
    @Get()
    async getAllMovies(): Promise<Movie[]> {
        return this.movieService.getAllMovies();
    }

    // Endpoint to get a single movie by ID
    @Get(':id')
    async getMovieById(@Param('id') id: string): Promise<Movie> {
        return this.movieService.getMovieById(id);
    }

    // Endpoint to post a movie
    @Post()
    async postMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
        return this.movieService.postMovie(createMovieDto);
    }

    // Endpoint to update a movie by ID
    @Post(':id')
    async updateMovie(
        @Param('id') id: string,
        @Body() createMovieDto: CreateMovieDto,
    ): Promise<Movie> {
        return this.movieService.updateMovie(id, createMovieDto);
    }

    // Endpoint to delete a movie by ID
    @Delete(':id')
    async deleteMovie(@Param('id') id: string): Promise<Movie> {
        return this.movieService.deleteMovie(id);
    }

}
