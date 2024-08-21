import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ShowDocument = Report & Document;

@Schema()
export class Report{

    @Prop()
    type: Array<String>;
    @Prop()
    data: string;
    @Prop()
    generated_at: string;
}

export const ShowSchema = SchemaFactory.createForClass(Report);