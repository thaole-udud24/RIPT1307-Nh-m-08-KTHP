import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/constants/roles.constant';

export type UserDocument = HydratedDocument<User> & {
  comparePassword(password: string): Promise<boolean>;
};

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
<<<<<<< HEAD
  email: string;
=======
  email!: string;
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000

  @Prop({
    required: false,
    select: false,
  })
  password?: string;

  @Prop({
    default: false,
  })
<<<<<<< HEAD
  isEmailVerified: boolean;
=======
  isEmailVerified!: boolean;
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000

  @Prop({
    type: [String],
    enum: Object.values(Role),
    default: [Role.USER],
  })
<<<<<<< HEAD
  roles: Role[];
=======
  roles!: Role[];
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000

  @Prop({ default: null })
  googleId?: string;

  @Prop({ default: '' })
  fullName?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);


// ==========================
// HASH PASSWORD
// ==========================
UserSchema.pre('save', async function () {
  const user = this as UserDocument;

  if (!user.isModified('password') || !user.password) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// ==========================
// COMPARE PASSWORD
// ==========================
UserSchema.methods.comparePassword = async function (
  plainPassword: string,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, this.password);
};