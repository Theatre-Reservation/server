import { Module } from '@nestjs/common';
import { EventSearchController } from './event_search.controller';
import { EventSearchService } from './event_search.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event ,EventSchema } from './event_search.model';

@Module({
  imports : [ 
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema }
    ])
  ],
  controllers: [EventSearchController],
  providers: [EventSearchService]
})
export class EventSearchModule {}
