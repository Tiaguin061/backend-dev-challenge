import { IUser, User } from '../../domain/entities/user';

import { HashProvider } from '@root/shared/providers/hashProvider/models/hash-provider';
import { RegisterUserRepositoryData } from '../../domain/repositories/types';
import { UserRepository } from '../../domain/repositories/user-respository';

export class InMemoryUserRepository implements UserRepository {
  private users: IUser[] = [];

  constructor(private hashProvider: HashProvider) {}

  async register(data: RegisterUserRepositoryData): Promise<IUser> {
    const user = new User(data).user;

    user.password = await this.hashProvider.hash(user.password, 10);

    this.users.push(user);

    return user;
  }

  async findUniqueById(user_id: string): Promise<IUser | null> {
    return this.users.find((where) => where.id === user_id);
  }

  async findUniqueByEmail(email: string): Promise<IUser | null> {
    return this.users.find((where) => where.email === email);
  }

  async findManyRestaurantsByUserId(user_id: string): Promise<IUser | null> {
    const foundUser = this.users.find((where) => where.id === user_id);

    if (!foundUser) {
      return null;
    }

    return foundUser;
  }
}
