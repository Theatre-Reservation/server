import { Controller, Post, Body, Param ,BadRequestException} from '@nestjs/common';
import { MailService } from './mail.service';
import { Types } from 'mongoose';
import { Mail } from './mail.model';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send/:id')
  async sendMail(@Param('id') mailId: string) {
    // Validate if mailId is a valid ObjectId
    if (!Types.ObjectId.isValid(mailId)) {
        throw new BadRequestException('Invalid mail ID format');
      }
  
    return this.mailService.sendMailWithQRCode(mailId);
  }

  @Post('create')
  async createMail(
    @Body('name') name: string,
    @Body('type') type: string,
    @Body('showName') showName: string,
    @Body('message') message: string,
  ) {
    // Build the mail data from the request body
    const mailData: Partial<Mail> = {
      name,
      type,
      showName,
      message,
    };

    // Call the service to create a new Mail document in the database
    return this.mailService.createMail(mailData);
  }
}
