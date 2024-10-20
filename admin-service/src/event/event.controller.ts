import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from '../db/event.model';
import { CreateEventDto } from './dto/event.dto';

@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    // Endpoint to get all events
    @Get()
    async getAllEvents(): Promise<Event[]> {
        return this.eventService.getAllEvents();
    }

    // Endpoint to get a single event by ID
    @Get(':id')
    async getEventById(@Param('id') id: string): Promise<Event> {
        return this.eventService.getEventById(id);
    }

    // Endpoint to post a event
    @Post()
    async postEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
        return this.eventService.postEvent(createEventDto);
    }

    // Endpoint to update a event by ID
    @Put(':id')
    async updateEvent(
        @Param('id') id: string,
        @Body() createEventDto: CreateEventDto,
    ): Promise<Event> {
        return this.eventService.updateEvent(id, createEventDto);
    }

    // Endpoint to delete a event by ID
    @Delete(':id')
    async deleteEvent(@Param('id') id: string): Promise<Event> {
        return this.eventService.deleteEvent(id);
    }

     @Post(':id/apply-discount')
  async applyDiscount(@Param('id') id: string, @Body() discountData: { percentage?: number; amount?: number; expiry?: Date  }): Promise<Event> {
      return this.eventService.applyDiscount(id, discountData);
  }

}
