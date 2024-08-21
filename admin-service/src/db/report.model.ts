import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ReportDocument = Report & Document;

@Schema()
export class Report {
    @Prop({ required: true })
    report_id: string;

    @Prop({ required: true })
    report_type: string;

    @Prop({
        required: true,
        type: {
            start: { type: Date, required: true },
            end: { type: Date, required: true },
        }
    })
    time_period: {
        start: Date;
        end: Date;
    };

    @Prop({ required: true, type: [{ type: Object }] })
    data: Array<object>;

    @Prop({ required: true })
    generated_at: Date;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
