import { Module } from '@nestjs/common';
import { MoviesService } from './search.service';
import { MoviesController } from './search.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie ,MovieSchema } from './search.model';

@Module({ 
  imports : [ 
    MongooseModule.forFeature([
      { name: Movie.name, schema: MovieSchema }
    ])
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class SearchModule {}
