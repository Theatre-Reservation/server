import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SeatDocument = Seat & Document;

@Schema()
export class Seat {
    @Prop({ required: true })
    seat_number: string;

    @Prop({ required: true })
    status: string; // Example values: "available", "reserved", "booked"

    @Prop({ type: String, required: true })
    theater_id: string; // Reference to the Theater

    @Prop({ required: true })
    created_at: Date;

    @Prop({ required: true })
    updated_at: Date;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);
