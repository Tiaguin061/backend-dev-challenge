import { AuthenticateUserServiceData, RegisterUserServiceData } from './types';

import { IUser } from '../entities/user';

export abstract class AbstractRegisterUserService {
  public abstract execute(data: RegisterUserServiceData): Promise<IUser>;
}

export abstract class AbstractAuthenticateUserService {
  public abstract execute(data: AuthenticateUserServiceData): Promise<{
    token: string;
    user: IUser;
  }>;
}
