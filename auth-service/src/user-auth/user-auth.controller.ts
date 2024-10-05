import { BadRequestException, Body, Controller, Get, Post, Res, Put, UnauthorizedException, Param, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserAuthService } from './user-auth.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';


@Controller('user-auth')
export class UserAuthController {
    constructor(
        private authService: UserAuthService,
        private jwtService: JwtService,
    ) {}

    // Fetch all users (for admin purposes)
    @Get()
    async all() {
        return this.authService.all();
    }

    // Create a new user (signup)
    @Post('signup')
    async create(
        @Body('Name') Name: string,
        @Body('Email') Email: string,
        @Body('Password') Password: string,
        @Body('isAdmin') isAdmin: boolean,
    ) {
        const existingUser = await this.authService.findOne({ Email });
        if (existingUser) {
            throw new BadRequestException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        const user = await this.authService.create({
            Name,
            Email,
            Password: hashedPassword,
            isAdmin: isAdmin || false,
        });

        delete user.Password;
        return user;
    }

    @Post('login')
    async login(
        @Body('Email') Email: string,
        @Body('Password') Password: string,
        @Res({ passthrough: true }) res: Response
) {
    console.log('Email:', Email);
    const user = await this.authService.findOne({ Email });
    console.log('Found User:', user);
    if (!user) {
        throw new BadRequestException('Invalid credentials user');
    }

    const passwordMatch = await bcrypt.compare(Password, user.Password);
    console.log('Password Match:', passwordMatch);
    if (!passwordMatch) {
        throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user._id });
    console.log('Generated JWT:', jwt);
    res.cookie('jwt', jwt, { httpOnly: true });

    const { Password: _, ...userDetails } = user.toObject();

    return {
        message: 'success',
        token: jwt,
        user: userDetails,
        redirectUrl: user.isAdmin ? '/adminPage' : '/',
    };
}


    // Fetch user details (requires JWT token)
    @Get('profile')
    async profile(@Req() req: Request) {
        const token = req.cookies.jwt;

        if (!token) {
            throw new UnauthorizedException('Unauthorized access');
        }

        const user = await this.authService.getUserFromToken(token);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const { Password, ...userDetails } = user.toObject();
        return userDetails;
    }

    // Update user profile (requires JWT token)
    @Put('profile')
    async updateProfile(
        @Req() req: Request,
        @Body('Name') Name: string,
        @Body('Email') Email: string,
    ) {
        const token = req.cookies.jwt;

        if (!token) {
            throw new UnauthorizedException('Unauthorized access');
        }

        const user = await this.authService.getUserFromToken(token);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const updatedUser = await this.authService.update(user._id as string, { Name, Email });

        const { Password, ...userDetails } = updatedUser.toObject();
        return userDetails;
    }

    // Log out the user
    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('jwt');
        return {
            message: 'success',
        };
    }
}
