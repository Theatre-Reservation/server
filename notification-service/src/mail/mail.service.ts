import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as QRCode from 'qrcode';
import * as nodemailer from 'nodemailer';
import { Mail, MailDocument } from './mail.model';

@Injectable()
export class MailService {
  constructor(
    @InjectModel(Mail.name) private mailModel: Model<MailDocument>, // Inject Mail model
  ) {}

  // Generate QR code and send mail
  async sendMailWithQRCode(mailId: string): Promise<any> {
    // Find the mail entry by ID
    const mail = await this.mailModel.findById(mailId);

    if (!mail) {
      throw new Error('Mail not found');
    }

    // Generate QR code from mail data
    const qrData = JSON.stringify({
      id: mail._id,
      name: mail.name,
      showName: mail.showName,
      type: mail.type,
      message: mail.message
      
    });

    const qrCode = await QRCode.toDataURL(qrData);
    // console.log("QR Code Data URL:", qrCode);

    // Prepare email content
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shalanikuruppu08@gmail.com',
        pass: 'glmi berz rmkb iicq',
      },
    });

    const mailOptions = {
      from: 'shalanikuruppu08@gmail.com',
      to: 'shalanikuruppu12@gmail.com', // Replace with actual recipient email
      subject: `Your E-Ticket for ${mail.showName}`,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #333;">🎟️ Your E-Ticket for ${mail.showName}</h2>
      <p>Hi <strong>${mail.name}</strong>,</p>
      <p>Thank you for booking your ticket for <strong>${mail.showName}</strong>!</p>

      <h3>Event Details:</h3>
      <ul>
        <li><strong>Event Name:</strong> ${mail.showName}</li>
        <li><strong>Event Type:</strong> ${mail.type}</li>
        <li><strong>Message:</strong> ${mail.message}</li>
      </ul>

      <p>Here is your e-ticket QR code. Please show this code at the entrance:</p>
      <div style="text-align: center; margin: 20px 0;">
        <img src="${qrCode}" alt="QR Code" style="border: 1px solid #ddd; padding: 10px; background: #fff;" />
      </div>

      <p>If you have any questions, feel free to <a href="adeeshak.21@cse.mrt.ac.lk">contact us</a>.</p>
      
      <p>We look forward to seeing you at the event!</p>

      <p>Best regards,</p>
      <p><strong>The Event Team</strong></p>

      <hr />
      <p style="font-size: 0.9em; color: #888;">This email was sent to you as a confirmation of your ticket booking. Please do not share your QR code with others.</p>
    </div>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return { message: 'Mail sent', qrCode,mail }; // Return the QR code along with the mail status
  }

  async createMail(mailData: Partial<Mail>): Promise<Mail> {
    const newMail = new this.mailModel(mailData);
    return newMail.save(); // Save the new mail document
  }

}
