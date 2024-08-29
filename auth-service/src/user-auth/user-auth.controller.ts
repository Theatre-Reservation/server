import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserAuthService } from './user-auth.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
//import { NotificationsService } from '../../../notification-service/src/notifications/notifications.service';

@Controller('user-auth')
export class UserAuthController {
    constructor(private authService: UserAuthService,
        private jwtService: JwtService,
        //private NotificationsService : NotificationsService,
    ){}

    @Get()
    async all(){
        return this.authService.all();
    }

    @Post('signup')
    async create(@Body('Name') Name: string,
                @Body('Email') Email: string,
                @Body('Password') Password: string){
        
        // Check if the email already exists
        const existingUser = await this.authService.findOne({ Email });
        if (existingUser) {
            throw new BadRequestException('Email already in use');
        }


        const hashedPassword = await bcrypt.hash(Password, 10);

        const user= await this.authService.create({
            Name,
            Email,
            Password: hashedPassword
        });
        delete user.Password;
        return user;
    }

  
    @Post('login')
    async login( @Body('Email') Email: string,
                 @Body('Password') Password: string,
                @Res({passthrough: true}) res: Response){
                    
        const user= await this.authService.findOne({Email});
                    if(!user){
                        throw new BadRequestException('Invalid credentials');
                    }
               
                    if(!await bcrypt.compare(Password, user.Password)){
                        throw new BadRequestException('Invalid credentials');
                    }
        const jwt = await this.jwtService.signAsync({id: user.id});

                    res.cookie('jwt', jwt, {httpOnly: true});
                    // const notification= await this.NotificationsService.createUserLoggedInNotification(user.Name);
                    // return {
                    //     notification,
                    //     message: 'success'
                    // };
                    return {
                        message: 'success'
                    };
                    // try {
                    //     // const notification = await this.NotificationsService.createUserLoggedInNotification(user.Name);
                    //     // return {
                    //     //     notification,
                          
                    //         //  'success',
                    //     };
                    // } catch (error) {
                    //     console.error('Error sending notification:', error);
                    //     return {
                    //         message: 'Login successful, but failed to send notification',
                    //     };
                    // }

        
                 }
    @Get('user')
    async user(@Req() request: Request){
        try{
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data){
                throw new UnauthorizedException();
            }
            const user = await this.authService.findOne({id: data['id']});
            const {Password, ...result} = user;
            return result;
        } catch(e) {
            throw new UnauthorizedException();
        }
       

    }

    @Post('logout')
    async logout(@Res({passthrough: true}) res: Response){
        res.clearCookie('jwt');
        return {
            message: 'success'
        };
    }
}
