import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShowDto } from './dto/show.dto';
import { Show, ShowDocument } from '../db/show.model';

@Injectable()
export class ShowService {
    constructor(@InjectModel(Show.name) private showModel: Model<ShowDocument>) {}

    async createShow(createShowDto: CreateShowDto): Promise<Show> {
        const createdShow = new this.showModel(createShowDto);
        return createdShow.save();
    }

    async getAllShows(): Promise<Show[]> {
        return this.showModel.find().exec();
    }

    async getShowById(id: string): Promise<Show> {
        const show = await this.showModel.findById(id).exec();
        if (!show) {
            throw new NotFoundException(`Show with ID ${id} not found`);
        }
        return show;
    }

    async updateShow(id: string, createShowDto: CreateShowDto): Promise<Show> {
        const updatedShow = await this.showModel.findByIdAndUpdate(id, createShowDto, {
            new: true,
        }).exec();
        if (!updatedShow) {
            throw new NotFoundException(`Show with ID ${id} not found`);
        }
        return updatedShow;
    }

    async deleteShow(id: string): Promise<Show> {
        const deletedShow = await this.showModel.findByIdAndDelete(id).exec();
        if (!deletedShow) {
            throw new NotFoundException(`Show with ID ${id} not found`);
        }
        return deletedShow;
    }
}
