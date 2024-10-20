import { Module } from '@nestjs/common';
import { ShowsController } from './show.controller';
import { ShowsService } from './show.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Show, ShowSchema } from '../db/show.model';
import { MovieGateway } from 'src/movie/movie.gateway';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Show.name, schema: ShowSchema },
    ])
  ],
  controllers: [ShowsController],
  providers: [ShowsService, MovieGateway]
})
export class ShowModule {}
