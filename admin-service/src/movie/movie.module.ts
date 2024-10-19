import { Delete, Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from 'src/db/movie.model';
import { DeleteMovie, DeleteMovieSchema } from 'src/db/deleteMovieModel';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
      {name: DeleteMovie.name, schema: DeleteMovieSchema} 
    ])
  ],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}
