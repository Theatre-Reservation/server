import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ShowDocument = Show & Document;

@Schema()
export class Show {
    // @Prop({ required: true, type: Types.ObjectId, ref: 'Admin' })
    // admin_id: Types.ObjectId;
    
    @Prop({ type: String, ref: 'Movie', required: true })
    movie: string;  // Name of the movie

    @Prop({ type: String, ref: 'Theatre', required: true })
    theater: string;  // Name of the theater

    @Prop({ required: true })
    date: string; // Store date as a string (format: YYYY-MM-DD)

    @Prop({ required: true })
    time: string;

    @Prop({ default: 0, required: false })
    discountPercentage: number; // Discount percentage (0 to 100)

    @Prop({ default: 0, required: false })
    discountAmount: number; // Fixed discount amount

    @Prop({ required: true })
    discountExpiry: Date; // Expiry date for the discount

    @Prop({ required: true })
    price: number; // Original price per seat

    @Prop({ type: [[Number]], required: true })
    seats: { type: Array<Array<number>>, required: true }

    @Prop({ type: [String], default: [] })
    reserved_seats: string[];  // List of reserved seats

    @Prop({ required: true })
    available_seats: number;  // Track number of available seats

    @Prop()
    created_at: Date;

    @Prop()
    updated_at: Date;

    // Methods to calculate discounted price
    getDiscountedPrice(): number {
        let discountedPrice = this.price;

        // Apply percentage discount if present
        if (this.discountPercentage) {
            discountedPrice -= (this.price * (this.discountPercentage / 100));
        }

        // Apply fixed amount discount if present
        if (this.discountAmount) {
            discountedPrice -= this.discountAmount;
        }

        // Ensure discounted price does not go below zero
        return Math.max(discountedPrice, 0);
    }

    // @Prop({ type: [String], default: [] })
    // temporary_reserved_seats: string[];  // List of temporarily reserved seats
}

export const ShowSchema = SchemaFactory.createForClass(Show);
