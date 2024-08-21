import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ShowDocument = Show & Document;

@Schema()
export class Show {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    img_url: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    genre: string;

    @Prop({ required: true })
    duration: number; // duration in minutes

    @Prop([{ 
        date: { type: Date, required: true },
        time: { type: String, required: true },
        theater_id: { type: Types.ObjectId, ref: 'Theater', required: true } 
    }])
    schedules: Array<{
        date: Date;
        time: string;
        theater_id: Types.ObjectId;
    }>;
}

export const ShowSchema = SchemaFactory.createForClass(Show);
