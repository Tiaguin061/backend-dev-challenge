import {
  AbstractCreateRestaurantService,
  AbstractUpdateUniqueRestaurantService,
} from '../../domain/services/restaurant-services';
import { describe, expect, it } from '@jest/globals';

import { BadRequestException } from '@nestjs/common';
import { CreateRestaurantService } from '../../services/create-restaurant.service';
import { InMemoryRestaurantRepository } from '../inMemory/restaurant-repository';
import { InMemoryStorageProvider } from '../inMemory/storage-provider';
import { Restaurant } from '../../domain/entities/restaurant';
import { RestaurantRepository } from '../../domain/repositories/restaurant-repository';
import { StorageProvider } from 'src/shared/providers/storageProvider/models/storage-provider';
import { UpdateUniqueRestaurantService } from '../../services/update-unique-restaurant.service';

let inMemoryRestaurantRepository: RestaurantRepository;
let inMemoryStorageProvider: StorageProvider;
let updateUniqueRestaurantService: AbstractUpdateUniqueRestaurantService;
let createRestaurantService: AbstractCreateRestaurantService;

describe('update-restaurant', () => {
  beforeEach(() => {
    inMemoryRestaurantRepository = new InMemoryRestaurantRepository();
    inMemoryStorageProvider = new InMemoryStorageProvider();
    createRestaurantService = new CreateRestaurantService(
      inMemoryRestaurantRepository,
      inMemoryStorageProvider,
    );
    updateUniqueRestaurantService = new UpdateUniqueRestaurantService(
      inMemoryRestaurantRepository,
      inMemoryStorageProvider,
    );
  });

  it('should be able to update a restaurant without profile_photo', async () => {
    const fakeRestaurant = new Restaurant({
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: 'fake-user_id',
    }).restaurant;

    const restaurantCreated = await createRestaurantService.execute(
      fakeRestaurant,
    );

    const fakeRestaurantToUpdate = new Restaurant({
      name: 'fake-name-updated',
      address: 'fake-address-updated',
      opening_hour: 'fake-opening_hour-updated',
      user_id: 'fake-user_id',
    }).restaurant;

    const restaurantUpdated = await updateUniqueRestaurantService.execute({
      restaurant_id: restaurantCreated.id,
      data: fakeRestaurantToUpdate,
    });

    expect(restaurantUpdated.name).toEqual('fake-name-updated');
  });

  it("should be able to update a restaurant's phofile_photo if phofile_photo already exists", async () => {
    const fakeRestaurant = new Restaurant({
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: 'fake-user_id',
      profile_photo: 'profile_photo.png',
    }).restaurant;

    const restaurantCreated = await createRestaurantService.execute(
      fakeRestaurant,
    );

    const updateFile = jest.spyOn(inMemoryStorageProvider, 'updateFile');

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

    expect(updateFile).toHaveBeenCalledWith({
      newFilename: 'new_profile_photo.png',
      oldFilename: restaurantCreated.profile_photo,
      newFilenameBuffer: buffer,
    });
  });

  it('should be able to save the phofile_photo of a restaurant if phofile_photo does not exist', async () => {
    const fakeRestaurant = new Restaurant({
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: 'fake-user_id',
    }).restaurant;

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
        data: {} as Restaurant,
        restaurant_id: 'fake-id',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
