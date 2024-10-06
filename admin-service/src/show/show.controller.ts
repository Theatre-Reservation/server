import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ShowsService } from './show.service';
import { Show } from '../db/show.model';
import { CreateShowDto } from './dto/show.dto';

@Controller('shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  // Retrieve all shows
  @Get()
  async getAllShows(): Promise<Show[]> {
    return this.showsService.getAllShows();
  }

  // Create a new show
  @Post()
  async createShow(@Body() createShowDto: CreateShowDto): Promise<Show> {
    return this.showsService.createShow(createShowDto);
  }

  // Retrieve a single show by ID
  // @Get(':id')
  // async getShowById(@Param('id') showId: string): Promise<Show> {
  //   const show = await this.showsService.getShowById(showId);
  //   if (!show) {
  //     throw new NotFoundException(`Show with ID ${showId} not found`);
  //   }
  //   return show;
  // }

  // retrieve a single show by movie name
  @Get(':movie')
  async getShowByMovie(@Param('movie') movie: string): Promise<Show[]> {
    const show = await this.showsService.getShowByMovie(movie);
    if (!show) {
      throw new NotFoundException(`Show with movie ${movie} not found`);
    }
    return show;
  }


  // Update a show by ID
  @Patch(':id')
  async updateShow(
    @Param('id') showId: string,
    @Body() updateShowDto: CreateShowDto,
  ): Promise<Show> {
    return this.showsService.updateShow(showId, updateShowDto);
  }

  // Delete a show by ID
  @Delete(':id')
  async deleteShow(@Param('id') showId: string): Promise<void> {
    return this.showsService.deleteShow(showId);
  }
}
