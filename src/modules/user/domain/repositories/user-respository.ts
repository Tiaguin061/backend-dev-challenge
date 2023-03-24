import { IUser } from '../entities/user';
import { RegisterUserRepositoryData } from './types';

export abstract class UserRepository {
  public abstract register(
    user_data: RegisterUserRepositoryData,
  ): Promise<IUser>;

  public abstract findUniqueById(user_id: string): Promise<IUser | null>;

  public abstract findUniqueByEmail(email: string): Promise<IUser | null>;

  public abstract findManyRestaurantsByUserId(
    user_id: string,
  ): Promise<IUser | null>;
}
