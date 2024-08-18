import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ShowDocument = Show & Document;

@Schema()
export class Show{
    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop()
    genre: string;
    @Prop()
    duration: number;
    @Prop()
    scedules: Array<any>;
}

export const ShowSchema = SchemaFactory.createForClass(Show);