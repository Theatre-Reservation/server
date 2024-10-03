import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from "mongoose";

export type ProfileDocument = Profile & Document;

@Schema( {})
export class Profile{

    @Prop({ required: true, type: String }) 
    Name: string;
    // @Prop() 
    // Type: string;
    // @Prop() 
    // ShowName: string;
    // @Prop()
    // Message: string;
    // @Prop({ default: Date.now }) // Default to current time
    // Timestamp: Date; // Add the timestamp property
   
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);