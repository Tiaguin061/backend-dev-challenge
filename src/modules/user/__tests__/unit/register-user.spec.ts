import { describe, expect, it } from '@jest/globals';

import { AbstractRegisterUserService } from '../../domain/services/user-service';
import { BadRequestException } from '@nestjs/common';
import { BcryptProvider } from '@root/shared/providers/hashProvider/implementations/bcrypt-provider';
import { HashProvider } from '@root/shared/providers/hashProvider/models/hash-provider';
import { IUser } from '../../domain/entities/user';
import { InMemoryUserRepository } from '../inMemory/user-repository';
import { RegisterUserService } from '../../services/register-user.service';
import { UserRepository } from '../../domain/repositories/user-respository';

let hashProvider: HashProvider;
let inMemoryUserRepository: UserRepository;

let registerUserService: AbstractRegisterUserService;

describe('Register User', () => {
  beforeEach(() => {
    hashProvider = new BcryptProvider();
    inMemoryUserRepository = new InMemoryUserRepository(hashProvider);

    registerUserService = new RegisterUserService(
      inMemoryUserRepository,
      hashProvider,
    );
  });

  it('should not be able to register new user with existing email', async () => {
    const fakeUser: IUser = {
      name: 'fake-name',
      email: 'fake-email@email.com',
      password: 'fake-password',
    };

    await inMemoryUserRepository.register(fakeUser);

    await expect(
      registerUserService.execute({
        ...fakeUser,
        password_confirmation: 'fake-password',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should not be able to register new user if password must be less 6', async () => {
    const fakeUser: IUser = {
      name: 'fake-name',
      email: 'fake-email@email.com',
      password: '123',
    };

    await inMemoryUserRepository.register(fakeUser);

    await expect(
      registerUserService.execute({
        ...fakeUser,
        password_confirmation: '123',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should not be able to register new user if password must be greater 256', async () => {
    const fakeUser: IUser = {
      name: 'fake-name',
      email: 'fake-email@email.com',
      password: '1'.repeat(260),
    };

    await inMemoryUserRepository.register(fakeUser);

    await expect(
      registerUserService.execute({
        ...fakeUser,
        password_confirmation: '123',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should not be able to register new user if password not matched with password_confirmation', async () => {
    const fakeUser: IUser = {
      name: 'fake-name',
      email: 'fake-email@email.com',
      password: '123456',
    };

    await inMemoryUserRepository.register(fakeUser);

    await expect(
      registerUserService.execute({
        ...fakeUser,
        password_confirmation: '1234567',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should be able to create a new user', async () => {
    const fakeUser: IUser = {
      name: 'fake-name',
      email: 'fake-email@email.com',
      password: 'fake-password',
    };

    const response = await registerUserService.execute({
      ...fakeUser,
      password_confirmation: 'fake-password',
    });

    expect(response.email).toBe('fake-email@email.com');
  });
});
