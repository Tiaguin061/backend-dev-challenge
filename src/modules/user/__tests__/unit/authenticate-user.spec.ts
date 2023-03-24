import { describe, expect, it } from '@jest/globals';

import { AbstractAuthenticateUserService } from '../../domain/services/user-service';
import { AuthenticateUserService } from '../../services/authenticate-user.service';
import { BadRequestException } from '@nestjs/common';
import { BycrptProvider } from '@root/shared/providers/hashProvider/implementations/bcrypt-provider';
import { HashProvider } from '@root/shared/providers/hashProvider/models/hash-provider';
import { IUser } from '../../domain/entities/user';
import { InMemoryUserRepository } from '../inMemory/user-repository';
import { JwtProvider } from '@root/shared/providers/tokenProvider/implementations/jwt-provider';
import { TokenProvider } from '@root/shared/providers/tokenProvider/models/token-provider';
import { UserRepository } from '../../domain/repositories/user-respository';

let inMemoryUserRepository: UserRepository;
let tokenProvider: TokenProvider;
let hashProvider: HashProvider;

let authenticateUserService: AbstractAuthenticateUserService;

describe('Authenticate User', () => {
  beforeEach(() => {
    hashProvider = new BycrptProvider();
    tokenProvider = new JwtProvider();
    inMemoryUserRepository = new InMemoryUserRepository(hashProvider);

    authenticateUserService = new AuthenticateUserService(
      inMemoryUserRepository,
      tokenProvider,
      hashProvider,
    );
  });

  it('should not be able to authenticate with invalid password', async () => {
    const fakeUser: IUser = {
      name: 'fake-name',
      email: 'fake-email@email.com',
      password: '123456',
    };

    await inMemoryUserRepository.register(fakeUser);

    await expect(
      authenticateUserService.execute({
        email: 'fake-email@email.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should not be able to authenticate with invalid email', async () => {
    const fakeUser: IUser = {
      name: 'fake-name',
      email: 'fake-email@email.com',
      password: '123456',
    };

    await inMemoryUserRepository.register(fakeUser);

    await expect(
      authenticateUserService.execute({
        email: 'invalid-email@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should be able to authenticate', async () => {
    const fakeUser: IUser = {
      name: 'fake-name',
      email: 'fake-email@email.com',
      password: '123456',
    };

    await inMemoryUserRepository.register(fakeUser);

    const response = await authenticateUserService.execute({
      email: 'fake-email@email.com',
      password: '123456',
    });

    expect(response).toEqual(
      expect.objectContaining({ token: expect.any(String) }),
    );
  });
});
