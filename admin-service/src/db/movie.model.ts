import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
    @Prop({ required: true, type: Types.ObjectId, ref: 'Admin' })
    admin_id: Types.ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    language: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    main_genre: string;

    @Prop({ type: [String], required: true })
    sub_genres: string[];

    @Prop({ required: true })
    poster_path: string;

    @Prop({ required: true })
    cover_path: string;

    @Prop({ required: true })
    released_date: Date;

    @Prop({ required: true })
    runtime: string;

    @Prop([{
        date: { type: Date, required: true },
        time: { type: String, required: true },
        price: { type: String, required: true },
        seats: { type: Array<Array<number>>, required: true }
    }])
    schedules: Array<{
        date: Date;
        time: string;
        price: string;
        seats: Array<Array<number>>;
    }>;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
