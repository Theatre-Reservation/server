import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
    @Prop({ required: true })
    reservation_id: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Show', required: true })
    show_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Theater', required: true })
    theater_id: Types.ObjectId;

    @Prop({ type: [{ seat_number: String, status: String }], required: true })
    seats: Array<{ seat_number: string; status: string }>;

    @Prop({ required: true })
    total_price: number;

    @Prop({ required: true })
    reservation_date: Date;

    @Prop({ required: true })
    status: string; // Example values: "confirmed", "cancelled"
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
