// src/events/schemas/event.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  poster_path: string;

  @Prop({ required: true })
  venue: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  runtime: string;

  @Prop({ required: true })
  ticket_price: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
