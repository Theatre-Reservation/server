import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AdminAuthDocument = AdminAuth & Document;

@Schema()
export class AdminAuth{

    @Prop()
    Name: string;
    @Prop()
    Email: string;
    @Prop()
    Password: string;
   
}

export const AdminAuthSchema = SchemaFactory.createForClass(AdminAuth);