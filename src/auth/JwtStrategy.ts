import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import * as cookie from 'cookie';

const extractJWTFromCookie = (req) => {
  let jwt = null;

  const cookies = req.headers.cookie || req.headers.cookies;
  if (req && cookies) {
    const { jwtToken } = cookie.parse(cookies || '');
    jwt = jwtToken;
  }

  return jwt;
};
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: extractJWTFromCookie,
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: any) {
    return { username: payload.username, sub: payload.email };
  }
}
