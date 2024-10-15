
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { Mail, MailSchema } from './mail.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Mail.name, schema: MailSchema }]), // Import the Mail schema
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
