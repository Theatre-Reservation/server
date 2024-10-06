import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';

@Controller('admin-auth')
export class AdminAuthController {
    constructor(private authService: AdminAuthService){}

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