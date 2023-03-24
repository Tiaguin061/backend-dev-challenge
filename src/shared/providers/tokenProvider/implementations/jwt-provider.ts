import { BadRequestException } from '@nestjs/common';
import { IUser } from '@root/modules/user/domain/entities/user';
import { TokenProvider } from '../models/token-provider';
import { auth } from '@root/config/auth';
import jwt from 'jsonwebtoken';

export interface JWTTokenPayload {
  exp: number;
  sub: string;
}

export class JwtProvider implements TokenProvider {
  signUser(user: IUser): string {
    const token = jwt.sign({}, auth.secretKey, {
      subject: user.id,
      expiresIn: auth.expiresIn,
    });

    return token;
  }

  decodeToken(token: string): string | JWTTokenPayload {
    try {
      const decoded = jwt.verify(token, auth.secretKey) as JWTTokenPayload;

      return decoded;
    } catch (err) {
      throw new BadRequestException('Invalid JWT payload');
    }
  }
}
