// src/items/items.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';


@Controller('search')
export class SearchController {
  constructor(private readonly SearchService: SearchService) {}

  @Get()
  async search(@Query('q') query: string) {
    return this.SearchService.search(query);
  }
}
