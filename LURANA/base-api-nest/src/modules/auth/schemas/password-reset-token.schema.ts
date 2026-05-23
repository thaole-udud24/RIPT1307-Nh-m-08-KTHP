import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PasswordResetTokenDocument =
  HydratedDocument<PasswordResetToken>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class PasswordResetToken {
  @Prop({
    required: true,
    lowercase: true,
    trim: true,
    index: true,
  })
<<<<<<< HEAD
  email: string;
=======
  email!: string;
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000

  @Prop({
    required: true,
    index: true,
  })
<<<<<<< HEAD
  code: string;
=======
  code!: string;
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000

  @Prop({
    required: true,
    index: true,
  })
<<<<<<< HEAD
  expiresAt: Date;
=======
  expiresAt!: Date;
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000

  @Prop({
    default: false,
  })
<<<<<<< HEAD
  used: boolean;
=======
  used!: boolean;
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
}

export const PasswordResetTokenSchema =
  SchemaFactory.createForClass(PasswordResetToken);