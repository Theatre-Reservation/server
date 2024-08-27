import { Controller, Get, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.schema';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async getAllEvents(): Promise<Event[]> {
    return this.eventsService.getAllEvents();
  }

  @Get('limited/5')
  async getMaxFiveEvents(): Promise<Event[]> {
    return this.eventsService.getMaxFiveEvents();
  }

  @Get('single/:id')
  async getMovieById(@Param('id') id: string): Promise<Event> {
    return this.eventsService.getEventById(id);
  }
}
