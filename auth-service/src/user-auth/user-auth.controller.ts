import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException , Inject} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserAuthService } from './user-auth.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';

@Controller('user-auth')
export class UserAuthController {
    constructor(private authService: UserAuthService,
        private jwtService: JwtService,
        @Inject('NOTIFICATION_SERVICE') private readonly notificationService: ClientProxy,
    ){}

    @Get()
    async all(){
        return this.authService.all();
    }

    @Post('signup')
    async create(@Body('Name') Name: string,
                @Body('Email') Email: string,
                @Body('Password') Password: string,
                @Body('isAdmin') isAdmin: boolean,){
        
        // Check if the email already exists
        const existingUser = await this.authService.findOne({ Email });
        if (existingUser) {
            throw new BadRequestException('Email already in use');
        }


        const hashedPassword = await bcrypt.hash(Password, 10);

        const user= await this.authService.create({
            Name,
            Email,
            Password: hashedPassword,
            isAdmin:  isAdmin || false, // Set isAdmin based on the request body
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
         // Emit login event to RabbitMQ
        await this.authService.emitLoginEvent(user.Name);
                  
                    return {
                        message: 'success',
                        redirectUrl: user.isAdmin ? '/adminPage' : '/', 
                    };
                   

        
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
