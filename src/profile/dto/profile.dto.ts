import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserDto extends Document {
  @Prop({ required: true })
  readonly _id: string; // Change to string type to match MongoDB ObjectID

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  role: string[]; // Array of strings for roles

}

export const UserDtoSchema = SchemaFactory.createForClass(UserDto);