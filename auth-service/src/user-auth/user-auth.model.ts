import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserAuthDocument = UserAuth & Document;

@Schema()
export class UserAuth{

    @Prop()
    Name: string;
    @Prop()
    Email: string;
    @Prop()
    Password: string;
   
}

export const UserAuthSchema = SchemaFactory.createForClass(UserAuth);