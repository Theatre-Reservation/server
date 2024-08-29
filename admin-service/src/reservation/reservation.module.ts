import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationSchema } from '../db/reservation.model';
import { UserSchema } from 'src/db/user.model';
import { ShowSchema } from 'src/db/show.model';
import { TheaterSchema } from 'src/db/theater.model';
import { SeatSchema } from 'src/db/seat.model';

@Module({
    imports: [
    MongooseModule.forFeature([
      { name: 'Reservation', schema: ReservationSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Show', schema: ShowSchema },
      { name: 'Theater', schema: TheaterSchema },
      { name: 'seat',schema:SeatSchema}

    ])
  ],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
