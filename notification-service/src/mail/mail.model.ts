import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

// Define the type for the document, extending the Notifications class with Mongoose Document
export type MailDocument = Mail & Document;

@Schema()  // Optional schema options can be added here
export class Mail {
    
    // Define the notification name (required)
    @Prop({ required: true, type: String })
    name: string;

    // Define the type of notification
    @Prop({ type: String })
    type: string;

    // Show name for which the notification is related (optional)
    @Prop({ type: String })
    showName: string;

    // The message content of the notification
    @Prop({ type: String })
    message: string;

    // Automatically assign the current timestamp for when the notification is created
    @Prop({ type: Date, default: Date.now })
    timestamp: Date;
}

// Create the schema using Mongoose's SchemaFactory
export const MailSchema = SchemaFactory.createForClass(Mail);
