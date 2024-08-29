import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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
  time: number;

  @Prop({ required: true })
  runtime: string;

  @Prop({ required: true })
  price: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);