import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidV4 } from 'uuid';
import { Document } from 'mongoose';

@Schema({ collection: 'users', timestamps: true })
export class UserEntity extends Document {
  @Prop({ type: String, required: false, default: uuidV4() })
  id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;
}

export type UserDocument = UserEntity & Document;

export const UserSchema = SchemaFactory.createForClass(UserEntity);
