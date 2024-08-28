import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ShowDocument = Show & Document;

@Schema()
export class Show {
    @Prop({ type: String, ref: 'Movie', required: true })
    movie: string;  // Name of the movie

    @Prop({ type: String, ref: 'Theater', required: true })
    theater: string;  // Name of the theater

    @Prop({ required: true })
    date: string; // Store date as a string (format: YYYY-MM-DD)

    @Prop({ required: true })
    time: string;

    @Prop({ required: true })
    price: number;  // Fixed price per seat for this show

    @Prop({ type: [String], default: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10',
                                       'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10',
                                       'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10',
                                       'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10',
                                       'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10',
                                       'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10',
                                       'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10',
                                       'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10'] })
    seats: string[];  // Predefined list of seats

    @Prop({ type: [String], default: [] })
    reserved_seats: string[];  // List of reserved seats

    @Prop({ required: true })
    available_seats: number;  // Track number of available seats

    @Prop({ required: true })
    created_at: Date;

    @Prop({ required: true })
    updated_at: Date;
}

export const ShowSchema = SchemaFactory.createForClass(Show);
