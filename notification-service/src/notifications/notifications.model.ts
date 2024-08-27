import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from "mongoose";

export type NotificationsDocument = Notifications & Document;

@Schema( {})
export class Notifications{

    @Prop() 
    Name: string;
    @Prop() 
    Type: string;
    @Prop() 
    ShowName: string;
    @Prop()
    Message: string;
    @Prop({ default: Date.now }) // Default to current time
    Timestamp: Date; // Add the timestamp property
   
}

export const NotificationsSchema = SchemaFactory.createForClass(Notifications);