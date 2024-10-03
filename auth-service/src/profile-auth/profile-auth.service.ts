import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileAuthService {
  // Update profile details with Name and Email
  async updateProfileDetails(name: string, email: string) {
    return {
      Name: name,
      Email: email,
      Status: 'Profile updated',
    };
  }
}
