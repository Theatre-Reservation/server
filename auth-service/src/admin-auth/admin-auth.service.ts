import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdminAuth, AdminAuthDocument } from './admin-auth.model';
import { Model } from 'mongoose';

@Injectable()
export class AdminAuthService {
    constructor(
        @InjectModel(AdminAuth.name) private readonly AdminAuthModel: Model<AdminAuthDocument>   
    ) {}

    async all(){
        return await this.AdminAuthModel.find().exec();
  } 
    
    async create(data:AdminAuth){
        const show = new this.AdminAuthModel(data);
        return await show.save();
}
}
