import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from 'src/db/event.model';
import { MovieGateway } from 'src/movie/movie.gateway';

@Module({
    imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema }
    ])
  ],
  controllers: [EventController],
  providers: [EventService, MovieGateway]
})
export class EventModule {}
