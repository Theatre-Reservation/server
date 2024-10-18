// src/booking/booking.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Show, ShowSchema } from './show.schema';
import { Theater, TheaterSchema } from './theatre.schema';
import { Movie, MovieSchema } from '../movies/movie.schema';
import { UserAuth, UserAuthSchema } from './user-auth.schema'; // **Import UserAuth schema**

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Show.name, schema: ShowSchema },
      { name: Theater.name, schema: TheaterSchema },
      { name: Movie.name, schema: MovieSchema },
      { name: UserAuth.name, schema: UserAuthSchema }, // **Register UserAuth model**
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
