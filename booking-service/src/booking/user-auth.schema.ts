import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserAuthDocument = UserAuth & Document;

@Schema({})
export class UserAuth {
    @Prop()
    Name: string;

    @Prop({ unique: [true, 'Duplicate email entered'] })
    Email: string;

    @Prop()
    Password: string;

    @Prop({ default: false }) // Set default as false for regular users
    isAdmin: boolean;

    // **New Property: loyaltyPoints**
    @Prop({ default: 0 })
    loyaltyPoints: number;
}

export const UserAuthSchema = SchemaFactory.createForClass(UserAuth);
