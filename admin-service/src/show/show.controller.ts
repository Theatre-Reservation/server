import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ShowService } from './show.service';

@Controller('admin/shows')
export class ShowController {
    constructor(private showService: ShowService) {}


    @Get()
    async all(){
        return this.showService.all();
    }

    @Post()
    async create(@Body('title') title: string,
                @Body('description') description: string,
                @Body('genre') genre: string,
                @Body('duration') duration: number,
                @Body('scedules') scedules: Array<any>){
    
        return this.showService.create({
            title, description, genre, duration, scedules
        });
    }

    @Get(':id')
    async get(@Param('id') id: string){
        return this.showService.get(id.toString());
    }

    @Put(':id')
    async update(@Param('id') id: string,
                @Body('title') title: string,
                @Body('description') description: string,
                @Body('genre') genre: string,
                @Body('duration') duration: number,
                @Body('scedules') scedules: Array<any>){
    
        return this.showService.update(id.toString(), {
            title, description, genre, duration, scedules
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: string){
        return 'delete';
    }

}
