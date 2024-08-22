import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    user_id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    password: string;  // Store hashed passwords

    @Prop({ required: true })
    created_at: Date;

    
    @Prop({ required: true })
    updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
