import { IsEmail, IsString, Length } from 'class-validator';

export class VerifyEmailDto {
  @IsEmail()
<<<<<<< HEAD
  email: string;

  @IsString()
  @Length(4, 8)
  code: string;
=======
  email!: string;

  @IsString()
  @Length(4, 8)
  code!: string;
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
}