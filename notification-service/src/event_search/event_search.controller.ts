import { Controller, Get, Query } from '@nestjs/common';
import { EventSearchService } from './event_search.service';

@Controller('event-search')
export class EventSearchController {
    constructor(private readonly eventsService: EventSearchService) {}

    // Endpoint to search movies
    @Get('search')
    async searchEvents(@Query('q') query: string) {
      console.log("Received query:", query);  // Log the received query
      if (!query) {
        console.log("No query provided");
        return [];
      }
  
      const result = await this.eventsService.searchEvents(query);
      console.log("Search result:", result);  // Log the search result
      return result;
    }    
}
