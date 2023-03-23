import { BadRequestException, Injectable } from '@nestjs/common';

import { AbstractRegisterUserService } from '../domain/services/user-service';
import { RegisterUserServiceData } from '../domain/services/types';
import { UserRepository } from '../domain/repositories/user-respository';
import bcrypt from 'bcrypt';

@Injectable()
export class RegisterUserService implements AbstractRegisterUserService {
  constructor(private userRepository: UserRepository) {}
  async execute(data: RegisterUserServiceData) {
    const { email, name, password_confirmation } = data;
    let { password } = data;

    const foundUser = await this.userRepository.findUniqueByEmail(email);

    if (foundUser) {
      throw new BadRequestException('This user already exist.');
    }

    if (password.trim().length < 6 || password.trim().length > 256) {
      throw new BadRequestException(
        'Password needs at least 6 and maximum 256 characters',
      );
    }

    if (password !== password_confirmation) {
      throw new BadRequestException(
        'Password not matches the password confirmation.',
      );
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    password = passwordHashed;

    const authenticatedUser = await this.userRepository.register({
      email,
      name,
      password,
    });

    return authenticatedUser;
  }
}
