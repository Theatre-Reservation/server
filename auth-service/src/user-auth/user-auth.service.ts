import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserAuth, UserAuthDocument } from './user-auth.model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAuthService {
    constructor(
        @InjectModel(UserAuth.name)
        private readonly UserAuthModel: Model<UserAuthDocument>,
        private jwtService: JwtService,
    ) {}

    // Fetch all users
    async all() {
        return await this.UserAuthModel.find().exec();
    }

    // Create a new user
    async create(data: UserAuth) {
        const user = new this.UserAuthModel(data);
        return await user.save();
    }

    // Find a single user by condition (email, id, etc.)
    async findOne(condition: any) {
        return this.UserAuthModel.findOne(condition).exec();
    }

    // Update a user by id
    async update(id: string, data: Partial<UserAuth>) {
        return this.UserAuthModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

  // Verify and decode JWT token to get the user's id
  async getUserFromToken(token: string) {
    try {

      // Verify token using jwtService and secret
      const decoded = await this.jwtService.verifyAsync(token);

      // Log decoded token for debugging
      console.log('Decoded Token:', decoded);

      // Fetch user by ID from the decoded token
      const user = await this.UserAuthModel.findById(decoded.id).exec();

      // Check if user exists
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Return user object if successful
      return user;
    } catch (error) {
      console.error('Error validating token:', error.message || error);
    }
  }
}


