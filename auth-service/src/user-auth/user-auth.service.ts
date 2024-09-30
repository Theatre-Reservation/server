import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserAuth, UserAuthDocument } from './user-auth.model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';




@Injectable()
export class UserAuthService {
    constructor(
        @InjectModel(UserAuth.name) 
        private readonly UserAuthModel: Model<UserAuthDocument>,   
        private jwtService: JwtService,
        @Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy,
        
    ) {}

    async all(){
        return await this.UserAuthModel.find().exec();
  } 
    
    async create(data:UserAuth){
        const show = new this.UserAuthModel(data);
        return await show.save();
}   
    
    async findOne(condition: any){
          return this.UserAuthModel.findOne(condition);
    }

    // Emit event when a user logs in
    async emitLoginEvent(Name: string, Email: string) {
       console.log('Emitting user_logged_in event for:', Name);
        this.client.emit('user_logged_in', {
            Name,
            
        });
    }
}
