import { IUser, User } from '../../domain/entities/user';

import { RegisterUserRepositoryData } from '../../domain/repositories/types';
import { UserRepository } from '../../domain/repositories/user-respository';

export class InMemoryUserRepository implements UserRepository {
  private users: IUser[] = [];

  async register(data: RegisterUserRepositoryData): Promise<IUser> {
    const user = new User(data).user;

    this.users.push(user);

    return user;
  }

  async findUniqueById(user_id: string): Promise<IUser | null> {
    return this.users.find((where) => where.id === user_id);
  }

  async findUniqueByEmail(email: string): Promise<IUser | null> {
    return this.users.find((where) => where.email === email);
  }
}
