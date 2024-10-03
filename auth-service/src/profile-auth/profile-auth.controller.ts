import { Controller } from '@nestjs/common';
import { ProfileAuthService } from './profile-auth.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('profile-auth')
export class ProfileAuthController {
  constructor(private readonly profileAuthService: ProfileAuthService) {}

  @EventPattern('user_logged_in')
  async updateProfileDetails(data: { Name: string, Password: string }) {
    const { Name, Password } = data;
    console.log('Received user_logged_in event for:', Name);
    const updatedProfile = await this.profileAuthService.updateProfileDetails(Name, Password);
    return updatedProfile;
    // return {
    //   success: true,
    //   message: 'Profile updated successfully',
    //   updatedProfile,  // Ensure the profile details are being returned
    // };
  }
}
