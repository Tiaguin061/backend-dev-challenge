import { BadRequestException, Injectable } from '@nestjs/common';

import { AbstractAuthenticateUserService } from '../domain/services/user-service';
import { AuthenticateUserServiceData } from '../domain/services/types';
import { HashProvider } from '@root/shared/providers/hashProvider/models/hash-provider';
import { TokenProvider } from '@root/shared/providers/tokenProvider/models/token-provider';
import { UserRepository } from '../domain/repositories/user-respository';

@Injectable()
export class AuthenticateUserService
  implements AbstractAuthenticateUserService
{
  constructor(
    private userRepository: UserRepository,
    private tokenProvider: TokenProvider,
    private hashProvider: HashProvider,
  ) {}
  async execute(data: AuthenticateUserServiceData) {
    const foundUser = await this.userRepository.findUniqueByEmail(data.email);

    if (!foundUser) {
      throw new BadRequestException('This user does not exist.');
    }

    const passwordMatched = await this.hashProvider.compare(
      data.password,
      foundUser.password,
    );

    if (!passwordMatched) {
      throw new BadRequestException('Invalid password or email.');
    }

    const token = this.tokenProvider.signUser(foundUser);

    return {
      user: foundUser,
      token,
    };
  }
}
