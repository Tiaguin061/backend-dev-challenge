import { describe, expect, it } from '@jest/globals';

import { AbstractCreateRestaurantService } from '../../domain/services/restaurant-services';
import { BadRequestException } from '@nestjs/common';
import { BcryptProvider } from '@root/shared/providers/hashProvider/implementations/bcrypt-provider';
import { CreateRestaurantService } from '../../services/create-restaurant.service';
import { HashProvider } from '@root/shared/providers/hashProvider/models/hash-provider';
import { IRestaurantProps } from '../../domain/entities/restaurant';
import { InMemoryRestaurantRepository } from '../inMemory/restaurant-repository';
import { InMemoryStorageProvider } from '../inMemory/storage-provider';
import { InMemoryUserRepository } from '@root/modules/user/__tests__/inMemory/user-repository';
import { RestaurantRepository } from '../../domain/repositories/restaurant-repository';
import { StorageProvider } from '@root/shared/providers/storageProvider/models/storage-provider';
import { UserRepository } from '@root/modules/user/domain/repositories/user-respository';

let inMemoryRestaurantRepository: RestaurantRepository;
let inMemoryUserRepository: UserRepository;
let hashProvider: HashProvider;
let inMemoryStorageProvider: StorageProvider;
let createRestaurantService: AbstractCreateRestaurantService;

describe('Create Restaurant', () => {
  beforeEach(() => {
    inMemoryRestaurantRepository = new InMemoryRestaurantRepository();
    hashProvider = new BcryptProvider();
    inMemoryUserRepository = new InMemoryUserRepository(hashProvider);
    inMemoryStorageProvider = new InMemoryStorageProvider();
    createRestaurantService = new CreateRestaurantService(
      inMemoryRestaurantRepository,
      inMemoryStorageProvider,
      inMemoryUserRepository,
    );
  });

  it('should be able to create a new restaurant without profile_photo', async () => {
    const user = await inMemoryUserRepository.register({
      email: 'fake-user@example.com',
      name: 'fake-user',
      password: '123456',
    });

    const fakeRestaurant: IRestaurantProps = {
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: user.id,
    };

    const restaurant = await createRestaurantService.execute(fakeRestaurant);

    expect(restaurant.id);
  });

  it('should be able create a new restaurant with phofile_photo', async () => {
    const saveFile = jest.spyOn(inMemoryStorageProvider, 'saveFile');

    let buffer: Buffer;

    const user = await inMemoryUserRepository.register({
      email: 'fake-user@example.com',
      name: 'fake-user',
      password: '123456',
    });

    const fakeRestaurant: IRestaurantProps = {
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: user.id,
    };

    await createRestaurantService.execute({
      ...fakeRestaurant,
      profile_photo_file: {
        buffer,
        originalname: 'profile_photo.png',
      } as CustomFile.File,
    });

    expect(saveFile).toHaveBeenCalledWith({
      buffer,
      filename: 'profile_photo.png',
    });
  });

  it('should not be able to create a new restaurant if user does not exist', async () => {
    const fakeRestaurant: IRestaurantProps = {
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: 'fake-user-id',
    };

    await expect(
      createRestaurantService.execute(fakeRestaurant),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
