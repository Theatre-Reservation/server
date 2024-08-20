import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';

@Controller('user-auth')
export class UserAuthController {
    constructor(private authService: UserAuthService){}

    @Get()
    async all(){
        return this.authService.all();
    }

    @Post()
    async create(@Body('Name') Name: string,
                @Body('Email') Email: string,
                @Body('Password') Password: string){
    
        return this.authService.create({
            Name,Email,Password
        });
    }
}
