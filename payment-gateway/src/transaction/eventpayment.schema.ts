import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventPaymentDocument = EventPayment & Document;

@Schema({ collection: 'eventpayments' })  // Collection name
export class EventPayment {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;  // Reference to the User model

    @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
    eventId: Types.ObjectId;  // Reference to the Event model

    @Prop({ required: true })
    eventTitle: string;  // Title of the event

    @Prop({ required: true })
    venue: string;  // Venue of the event

    @Prop({ required: true })
    totalAmount: number;  // Total cost of the transaction

    @Prop({ required: true })
    ticketCount: number;  // Number of tickets purchased

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;  // Timestamp of the transaction creation

    @Prop({ type: Date, default: Date.now })
    createdAtDate: Date;  // Date part of the transaction creation timestamp
}

export const EventPaymentSchema = SchemaFactory.createForClass(EventPayment);
