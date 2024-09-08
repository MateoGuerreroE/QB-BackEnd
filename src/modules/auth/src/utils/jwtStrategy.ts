import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserRecord } from 'src/modules/repository';

interface JwtPayload {
  sub: string;
  email: string;
  isEnabled: boolean;
  isDeleted: boolean;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<Partial<UserRecord>> {
    return {
      userId: payload.sub,
      emailAddress: payload.email,
      isEnabled: payload.isEnabled,
      isDeleted: payload.isDeleted,
    };
  }
}
