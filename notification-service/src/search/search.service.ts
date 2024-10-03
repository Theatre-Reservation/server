import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie , SearchDocument} from './search.model';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<SearchDocument>
  ) {}

  // Method to search movies based on a query
  async searchMovies(query: string): Promise<Movie[]> {
    console.log(query,"Query")
    if (!query) {
      return [];
    }
    const searchRegex = new RegExp(query, 'i'); // Case-insensitive search
    return this.movieModel.find({
      $or: [
        { title: searchRegex },
        { main_genre: searchRegex },
        { sub_genres: { $in: [searchRegex] } }
      ]
    }).exec();
  }
}
