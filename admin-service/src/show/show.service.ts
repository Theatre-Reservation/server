import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Show, ShowDocument } from '../db/show.model';
import { Model } from 'mongoose';

@Injectable()
export class ShowService {
    constructor(
        @InjectModel(Show.name) private readonly showModel:Model<ShowDocument>
    ) {}

    async all(){
        return await this.showModel.find().exec();
    }

    async create(data:Show){
        const show = new this.showModel(data);
        return await show.save();
    }

    async get(id:string){
        return await this.showModel.findById(id).exec();
    }

    async update(id:string, data:Show){
        return await this.showModel.findByIdAndUpdate(id, data, {new:true}).exec();
    }   

    async delete(id:string){
        return await this.showModel.findByIdAndDelete(id).exec();
    }
}
