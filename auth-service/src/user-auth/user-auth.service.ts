import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserAuth, UserAuthDocument } from './user-auth.model';
import { Model } from 'mongoose';

@Injectable()
export class UserAuthService {
    constructor(
        @InjectModel(UserAuth.name) private readonly UserAuthModel: Model<UserAuthDocument>   
    ) {}

    async all(){
        return await this.UserAuthModel.find().exec();
  } 
    
    async create(data:UserAuth){
        const show = new this.UserAuthModel(data);
        return await show.save();
}
}
