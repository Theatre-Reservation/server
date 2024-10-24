import { Delete, Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from 'src/db/movie.model';
import { MovieGateway } from './movie.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema },
    ])
  ],
  controllers: [MovieController],
  providers: [MovieService, MovieGateway]
})
export class MovieModule {}
