import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

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

    @Post('signup')
    signUp(@Body() signUpDto: SignUpDto ) : Promise<{token: string}>
    {
        return this.authService.signUp(signUpDto);
    }

    @Get('login')
    login(@Body() loginDto: LoginDto ) : Promise<{token: string}>
    {
        return this.authService.login(loginDto);
    }
}
