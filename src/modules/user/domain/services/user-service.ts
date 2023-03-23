import { IUser } from '../entities/user';
import { RegisterUserServiceData } from './types';

export abstract class AbstractRegisterUserService {
  public abstract execute(data: RegisterUserServiceData): Promise<IUser>;
}
