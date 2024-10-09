import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ShowDocument = Show & Document;

@Schema()
export class Show {
    @Prop({ required: true, type: Types.ObjectId, ref: 'Admin' })
    admin_id: Types.ObjectId;
    
    @Prop({ type: String, ref: 'Movie', required: true })
    movie: string;  // Name of the movie

    @Prop({ type: String, ref: 'Theatre', required: true })
    theatre: string;  // Name of the theater

    @Prop({ required: true })
    date: string; // Store date as a string (format: YYYY-MM-DD)

    @Prop({ required: true })
    time: string;

    @Prop({ required: true })
    price: number;  // Fixed price per seat for this show

    @Prop({ type: [[Number]], required: true })
    seats: { type: Array<Array<number>>, required: true }

    // @Prop({ type: [String], default: [] })
    // reserved_seats: string[];  // List of reserved seats

    // @Prop({ required: true })
    // available_seats: number;  // Track number of available seats

    @Prop({ required: true })
    created_at: Date;

    @Prop({ required: true })
    updated_at: Date;

    // @Prop({ type: [String], default: [] })
    // temporary_reserved_seats: string[];  // List of temporarily reserved seats
}

export const ShowSchema = SchemaFactory.createForClass(Show);
