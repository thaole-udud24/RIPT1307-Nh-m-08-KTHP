import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
<<<<<<< HEAD
  email: string;

  @IsString()
  password: string;
=======
  email!: string;

  @IsString()
  password!: string;
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
}