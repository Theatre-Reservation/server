import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-qrcode')
  async sendMailWithQRCode(@Body() userData: any) {
    try {
      // Pass the front-end data to the mail service
      const result = await this.mailService.sendMailWithQRCode(userData);

      return {
        message: 'E-Ticket sent successfully!',
        qrCodeURL: result.qrCodeURL, // Return the QR code to the frontend
      };
    } catch (error) {
      return {
        message: 'Error sending e-ticket',
        error: error.message,
      };
    }
  }
}
