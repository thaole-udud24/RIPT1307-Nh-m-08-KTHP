import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
<<<<<<< HEAD
  refreshToken: string;
=======
  refreshToken!: string;
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
}