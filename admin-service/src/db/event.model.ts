import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Admin' })
  admin_id: Types.ObjectId;   

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  poster_path: string;

  @Prop({ required: true })
  venue: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  runtime: string;

  @Prop({ required: true })
  ticket_price: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);