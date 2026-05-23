import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type EmailVerifyTokenDocument =
  HydratedDocument<EmailVerifyToken>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class EmailVerifyToken {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
<<<<<<< HEAD
  userId: Types.ObjectId;
=======
  userId!: Types.ObjectId;
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

export const EmailVerifyTokenSchema =
  SchemaFactory.createForClass(EmailVerifyToken);