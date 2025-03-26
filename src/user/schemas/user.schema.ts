import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop({ required: true, uppercase: true, trim: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop()
    status: boolean

    @Prop()
    deletedDate: Date

}

export const userSchema = SchemaFactory.createForClass(User)