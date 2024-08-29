import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TheaterDocument = Theater & Document;

@Schema()
export class Theater {
    @Prop({ required: true })
    theater_id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    location: string;

    @Prop({ required: true })
    capacity: number;

    @Prop({ required: true })
    created_at: Date;

    @Prop({ required: true })
    updated_at: Date;
}

export const TheaterSchema = SchemaFactory.createForClass(Theater);
