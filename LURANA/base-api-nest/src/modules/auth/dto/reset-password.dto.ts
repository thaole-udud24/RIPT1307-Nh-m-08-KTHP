import { IsEmail, IsString, MinLength, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
<<<<<<< HEAD
  email: string;

  @IsString()
  @Length(4, 4)
  code: string;

  @IsString()
  @MinLength(6)
  newPassword: string;

  @IsString()
  @MinLength(6)
  confirmNewPassword: string;
=======
  email!: string;

  @IsString()
  @Length(4, 4)
  code!: string;

  @IsString()
  @MinLength(6)
  newPassword!: string;

  @IsString()
  @MinLength(6)
  confirmNewPassword!: string;
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
}