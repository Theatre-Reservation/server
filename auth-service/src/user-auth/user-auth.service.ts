import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserAuth, UserAuthDocument } from './user-auth.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserAuthService {
    constructor(
        @InjectModel(UserAuth.name) 
        private readonly UserAuthModel: Model<UserAuthDocument>,   
        private jwtService: JwtService,
    ) {}

    async all(){
        return await this.UserAuthModel.find().exec();
  } 
    
    async create(data:UserAuth){
        const show = new this.UserAuthModel(data);
        return await show.save();
}
    async signUp(signUpDto: SignUpDto) : Promise<{token:string}>
    {
        const {Name,Email,Password} = signUpDto;
 // Check if the email already exists
    const existingUser = await this.UserAuthModel.findOne({ Email }).exec();
            if (existingUser) {
                throw new ConflictException('Email already in use');
            }

        const hashedPassword = await bcrypt.hash(Password, 10);
        const user = await this.UserAuthModel.create({
            Name: Name,
            Email: Email,
            Password: hashedPassword
        })

        const token = this.jwtService.sign({ id: user._id})
        return { token }
    }

 
    async login(loginDto: LoginDto) : Promise<{token:string}> {
        const { Email, Password } = loginDto;
        const user = await this.UserAuthModel.findOne({ Email}) 

        if(!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordMatched = await bcrypt.compare(Password, user.Password)
        if(!isPasswordMatched) {
            throw new UnauthorizedException('Invalid email or password');
        }

        
        const token = this.jwtService.sign({ id: user._id})
        return { token }
    }
}
