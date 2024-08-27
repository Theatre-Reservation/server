import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/movie.dto';
import { Movie, MovieDocument } from 'src/db/movie.model';

@Injectable()
export class MovieService {
    constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}

    async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
        const createMovie = new this.movieModel(createMovieDto);
        return createMovie.save();
    }

    async getAllMovies(): Promise<Movie[]> {
        return this.movieModel.find().exec();
    }

    async getMovieById(id: string): Promise<Movie> {
        const movie = await this.movieModel.findById(id).exec();
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
        return movie;
    }

    // async getMoviesByMainGenre(main_genre: string): Promise<Movie[]> {
    //     return this.movieModel.find({ main_genre }).exec();
    // }

    async postMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
        const createdMovie = new this.movieModel(createMovieDto);
        return createdMovie.save();
    }

    async updateMovie(id: string, createMovieDto: CreateMovieDto): Promise<Movie> {
        const updatedMovie = await this.movieModel.findByIdAndUpdate(id, createMovieDto, {
            new: true,
        }).exec();
        if (!updatedMovie) {
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
        return updatedMovie;
    }

    async deleteMovie(id: string): Promise<Movie> {
        const deletedMovie = await this.movieModel.findByIdAndDelete(id).exec();
        if (!deletedMovie) {
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
        return deletedMovie;
    }



}
