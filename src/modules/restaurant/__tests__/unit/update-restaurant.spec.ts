import {
  AbstractCreateRestaurantService,
  AbstractUpdateUniqueRestaurantService,
} from '../../domain/services/restaurant-services';
import { describe, expect, it } from '@jest/globals';

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
import { UpdateUniqueRestaurantService } from '../../services/update-unique-restaurant.service';
import { UserRepository } from '@root/modules/user/domain/repositories/user-respository';

let inMemoryRestaurantRepository: RestaurantRepository;
let inMemoryUserRepository: UserRepository;
let inMemoryStorageProvider: StorageProvider;
let hashProvider: HashProvider;
let updateUniqueRestaurantService: AbstractUpdateUniqueRestaurantService;
let createRestaurantService: AbstractCreateRestaurantService;

describe('update-unique-restaurant', () => {
  beforeEach(() => {
    inMemoryRestaurantRepository = new InMemoryRestaurantRepository();

    hashProvider = new BcryptProvider();

    inMemoryStorageProvider = new InMemoryStorageProvider();

    inMemoryUserRepository = new InMemoryUserRepository(hashProvider);

    createRestaurantService = new CreateRestaurantService(
      inMemoryRestaurantRepository,
      inMemoryStorageProvider,
      inMemoryUserRepository,
    );

    updateUniqueRestaurantService = new UpdateUniqueRestaurantService(
      inMemoryRestaurantRepository,
      inMemoryStorageProvider,
    );
  });

  it('should be able to update a restaurant without profile_photo', async () => {
    const user = await inMemoryUserRepository.register({
      email: 'user@example.com',
      name: 'fake-name',
      password: '123456',
    });

    const fakeRestaurant: IRestaurantProps = {
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: user.id,
    };

    const restaurantCreated = await createRestaurantService.execute(
      fakeRestaurant,
    );

    const fakeRestaurantToUpdate: IRestaurantProps = {
      name: 'fake-name-updated',
      address: 'fake-address-updated',
      opening_hour: 'fake-opening_hour-updated',
      user_id: user.id,
    };

    const restaurantUpdated = await updateUniqueRestaurantService.execute({
      restaurant_id: restaurantCreated.id,
      data: fakeRestaurantToUpdate,
    });

    expect(restaurantUpdated.name).toEqual('fake-name-updated');
  });

  it("should be able to update a restaurant's phofile_photo if phofile_photo already exists", async () => {
    const user = await inMemoryUserRepository.register({
      email: 'user@example.com',
      name: 'fake-name',
      password: '123456',
    });

    const fakeRestaurant: IRestaurantProps = {
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: user.id,
      profile_photo: 'profile_photo.png',
    };

    let buffer: Buffer;

    const restaurantCreated = await createRestaurantService.execute({
      ...fakeRestaurant,
      profile_photo_file: {
        buffer,
        originalname: fakeRestaurant.profile_photo,
      } as CustomFile.File,
    });

    const updateFile = jest.spyOn(inMemoryStorageProvider, 'updateFile');

    await updateUniqueRestaurantService.execute({
      restaurant_id: restaurantCreated.id,
      data: {
        ...restaurantCreated,
        profile_photo_file: {
          buffer,
          originalname: 'new_profile_photo.png',
        } as CustomFile.File,
      },
    });

    expect(updateFile).toHaveBeenCalledWith({
      newFilename: 'new_profile_photo.png',
      oldFilename: restaurantCreated.profile_photo,
      newFilenameBuffer: buffer,
    });
  });

  it('should be able to save the phofile_photo of a restaurant if phofile_photo does not exist', async () => {
    const user = await inMemoryUserRepository.register({
      email: 'user@example.com',
      name: 'fake-name',
      password: '123456',
    });

    const fakeRestaurant: IRestaurantProps = {
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: user.id,
    };

    const restaurantCreated = await createRestaurantService.execute(
      fakeRestaurant,
    );

    const saveFile = jest.spyOn(inMemoryStorageProvider, 'saveFile');

    let buffer: Buffer;

    await updateUniqueRestaurantService.execute({
      restaurant_id: restaurantCreated.id,
      data: {
        ...restaurantCreated,
        profile_photo_file: {
          buffer,
          originalname: 'new_profile_photo.png',
        } as CustomFile.File,
      },
    });

    expect(saveFile).toHaveBeenCalledWith({
      buffer,
      filename: 'new_profile_photo.png',
    });
  });

  it('should be able to show an error if restaurant does not exist', async () => {
    await expect(
      updateUniqueRestaurantService.execute({
        data: {} as IRestaurantProps,
        restaurant_id: 'fake-id',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
