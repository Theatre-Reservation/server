import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as QRCode from 'qrcode';
import * as nodemailer from 'nodemailer';
import { Mail, MailDocument } from './mail.model';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig'; // import your Firebase storage configuration

@Injectable()
export class MailService {
  constructor(
    @InjectModel(Mail.name) private mailModel: Model<MailDocument>, // Inject Mail model
  ) {}

  // Helper function to convert base64 to a Blob
  private base64ToBlob(base64Data: string, contentType: string = ''): Blob {
    const sliceSize = 512;
    const byteCharacters = Buffer.from(base64Data, 'base64').toString('binary');
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

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

    console.log(qrData);

    const qrCodeBase64 = await QRCode.toDataURL(qrData);
     console.log("QR Code Data URL:", qrCodeBase64);

    // Convert the QR code base64 string to a Blob
    const base64Data = qrCodeBase64.split(',')[1]; // Remove the data URL prefix
    const qrCodeBlob = this.base64ToBlob(base64Data, 'image/png');

    // Upload the QR code Blob to Firebase Storage
    const qrCodeFileName = `qrcodes/${mail._id}.png`; // Use mail ID as filename
    const qrCodeRef = ref(storage, qrCodeFileName);
    const uploadSnapshot = await uploadBytes(qrCodeRef, qrCodeBlob);

    // Get the download URL of the uploaded QR code
    const qrCodeURL = await getDownloadURL(uploadSnapshot.ref);
    console.log('QR Code Firebase URL:', qrCodeURL);


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
        <img src=${qrCodeURL} alt="QR Code" style="border: 1px solid #ddd; padding: 10px; background: #fff;" />
      </div>

      <p>If you have any questions, feel free to <a href="mailto:adeeshak.21@cse.mrt.ac.lk">contact us</a>.</p>
      
      <p>We look forward to seeing you at the event!</p>

      <p>Best regards,</p>
      <p><strong>The Event Team</strong></p>

      <hr />
      <p style="font-size: 0.9em; color: #888;">This email was sent to you as a confirmation of your ticket booking. Please do not share your QR code with others.</p>
    </div>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return { message: 'Mail sent', qrCodeURL,mail }; // Return the QR code along with the mail status
  }

  async createMail(mailData: Partial<Mail>): Promise<Mail> {
    const newMail = new this.mailModel(mailData);
    return newMail.save(); // Save the new mail document
  }

}
