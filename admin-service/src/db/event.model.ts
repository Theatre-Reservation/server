import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event extends Document {
  // @Prop({ required: true, type: Types.ObjectId, ref: 'Admin' })
  // admin_id: Types.ObjectId;   

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

  @Prop({ default: 0, required: false })
    discountPercentage: number; // Discount percentage (0 to 100)

    @Prop({ default: 0, required: false })
    discountAmount: number; // Fixed discount amount

    @Prop({ required: false })
    discountExpiry: Date; // Expiry date for the discount

  @Prop({ required: true })
  ticket_price: number;

      // Methods to calculate discounted price
    getDiscountedPrice(): number {
        let discountedPrice = this.ticket_price;

        // Apply percentage discount if present
        if (this.discountPercentage) {
            discountedPrice -= (this.ticket_price * (this.discountPercentage / 100));
        }

        // Apply fixed amount discount if present
        if (this.discountAmount) {
            discountedPrice -= this.discountAmount;
        }

        // Ensure discounted price does not go below zero
        return Math.max(discountedPrice, 0);
    }
}

export const EventSchema = SchemaFactory.createForClass(Event);