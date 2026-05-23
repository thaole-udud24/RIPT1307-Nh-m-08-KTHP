<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
=======
import { Injectable, UnauthorizedException } from '@nestjs/common';
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    const secret = config.get<string>('JWT_ACCESS_SECRET');
<<<<<<< HEAD
    if (!secret) throw new Error('Missing JWT_ACCESS_SECRET in env');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
=======
    if (!secret) {
      throw new Error('Missing JWT_ACCESS_SECRET in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, 
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
<<<<<<< HEAD
    return payload;
=======
    if (!payload || !payload.roles) {
      throw new UnauthorizedException('Token không hợp lệ hoặc thiếu quyền hạn');
    }
    return {
      userId: payload.sub,
      email: payload.email,
      roles: payload.roles,
    };
>>>>>>> 45b5da6cbee2c367b805619f9783ea6b8b97f000
  }
}