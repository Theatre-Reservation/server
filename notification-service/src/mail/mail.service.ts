import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import * as nodemailer from 'nodemailer';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig'; // import your Firebase storage configuration

@Injectable()
export class MailService {
  constructor() {}

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
  async sendMailWithQRCode(userData: any): Promise<any> {
    const {
      userName,
      userEmail,
      movieName,
      theatreName,
      selectedSeats,
      eventTitle,
      venue,
      ticketCount,
      isMovie
    } = userData;

    // Generate QR code from the provided data
    const qrData = JSON.stringify({
      userName,
      userEmail,
      movieName,
      theatreName,
      selectedSeats,
      eventTitle,
      venue,
      ticketCount,
      isMovie
    });

    console.log(qrData);

    const qrCodeBase64 = await QRCode.toDataURL(qrData);
    console.log("QR Code Data URL:", qrCodeBase64);

    // Convert the QR code base64 string to a Blob
    const base64Data = qrCodeBase64.split(',')[1]; // Remove the data URL prefix
    const qrCodeBlob = this.base64ToBlob(base64Data, 'image/png');

    // Upload the QR code Blob to Firebase Storage
    const qrCodeFileName = `qrcodes/${userName}_${Date.now()}.png`; // Use a combination of username and timestamp as the filename
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
      to: 'shalanikuruppu12@gmail.com', // Send to the user's email
      subject: `Your E-Ticket for ${isMovie ? movieName : eventTitle}`,
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">🎟️ Your E-Ticket for ${isMovie ? movieName : eventTitle}</h2>
        <p>Hi <strong>${userName}</strong>,</p>
        <p>Thank you for booking your ticket!</p>
        <h3>Ticket Details:</h3>
        <ul>
          ${isMovie ? `
            <li><strong>Movie Name:</strong> ${movieName}</li>
            <li><strong>Theatre:</strong> ${theatreName}</li>
            <li><strong>Selected Seats:</strong> ${selectedSeats.join(', ')}</li>
          ` : `
            <li><strong>Event Title:</strong> ${eventTitle}</li>
            <li><strong>Venue:</strong> ${venue}</li>
            <li><strong>Tickets Count:</strong> ${ticketCount}</li>
          `}
        </ul>
        <p>Here is your e-ticket QR code. Please show this code at the entrance:</p>
        <div style="text-align: center; margin: 20px 0;">
          <img src=${qrCodeURL} alt="QR Code" style="border: 1px solid #ddd; padding: 10px; background: #fff;" />
        </div>
        <p>If you have any questions, feel free to contact us.</p>
        <p>Best regards,<br><strong>The Event Team</strong></p>
        <hr />
        <p style="font-size: 0.9em; color: #888;">This email was sent to confirm your ticket booking.</p>
      </div>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return { message: 'Mail sent', qrCodeURL };
  }
}
