import { IUser } from '@root/modules/user/domain/entities/user';

export abstract class TokenProvider {
  abstract signUser(user: IUser): string;
  abstract decodeToken(token: string): string | any;
}
