import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ShowService } from './show.service';
import { CreateShowDto } from './dto/show.dto';
import { Show } from '../db/show.model';

@Controller('shows')
export class ShowController {
    constructor(private readonly showService: ShowService) {}

    // Endpoint to create a new show
    @Post()
    async createShow(@Body() createShowDto: CreateShowDto): Promise<Show> {
        return this.showService.createShow(createShowDto);
    }

    // Endpoint to get all shows
    @Get()
    async getAllShows(): Promise<Show[]> {
        return this.showService.getAllShows();
    }

    // Endpoint to get a single show by ID
    @Get(':id')
    async getShowById(@Param('id') id: string): Promise<Show> {
        return this.showService.getShowById(id);
    }

    // Endpoint to post a show
    @Post()
    async postShow(@Body() createShowDto: CreateShowDto): Promise<Show> {
        return this.showService.postShow(createShowDto);
    }

    // Endpoint to update a show by ID
    @Put(':id')
    async updateShow(
        @Param('id') id: string,
        @Body() createShowDto: CreateShowDto,
    ): Promise<Show> {
        return this.showService.updateShow(id, createShowDto);
    }

    // Endpoint to delete a show by ID
    @Delete(':id')
    async deleteShow(@Param('id') id: string): Promise<Show> {
        return this.showService.deleteShow(id);
    }
}
