import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../enums/role.enum';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop({
    type: [{type: String, enum: Role}],
    default: [Role.USER]
  })
  role: Role[]

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
