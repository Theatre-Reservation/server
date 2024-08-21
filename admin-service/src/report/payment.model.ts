import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
    @Prop({ required: true })
    payment_id: string;

    @Prop({ type: Types.ObjectId, ref: 'Reservation', required: true })
    reservation_id: Types.ObjectId;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    payment_method: string; // Example values: "credit card", "PayPal"

    @Prop({ required: true })
    payment_date: Date;

    @Prop({ required: true })
    status: string; // Example values: "completed", "failed"
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
