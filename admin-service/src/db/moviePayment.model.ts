import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ collection: 'moviepayments' })  // Here you specify the collection name
export class Transaction {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;  // Reference to the User model

    @Prop({ type: Types.ObjectId, ref: 'Show', required: true })
    showId: Types.ObjectId;  // Reference to the Show model

    @Prop({ required: true })
    movie: string;  // Name of the movie

    @Prop({ required: true })
    theatre: string;  // Name of the theatre

    @Prop({ required: true })
    totalAmount: number;  // Total cost of the transaction

    @Prop({ type: [String], required: true })
    selectedSeats: string[];  // Array of selected seat identifiers

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;  // Timestamp of the transaction creation

    @Prop({ type: Date, default: Date.now })
    createdAtDate: Date;  // Date part of the transaction creation timestamp
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
