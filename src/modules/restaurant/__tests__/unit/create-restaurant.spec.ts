import { describe, expect, it } from '@jest/globals';

import { AbstractCreateRestaurantService } from '../../domain/services/restaurant-services';
import { CreateRestaurantService } from '../../services/create-restaurant.service';
import { InMemoryRestaurantRepository } from '../inMemory/restaurant-repository';
import { InMemoryStorageProvider } from '../inMemory/storage-provider';
import { Restaurant } from '../../domain/entities/restaurant';
import { RestaurantRepository } from '../../domain/repositories/restaurant-repository';
import { StorageProvider } from 'src/shared/providers/storageProvider/models/storage-provider';

let inMemoryRestaurantRepository: RestaurantRepository;
let inMemoryStorageProvider: StorageProvider;
let createRestaurantService: AbstractCreateRestaurantService;

describe('create-restaurant', () => {
  beforeEach(() => {
    inMemoryRestaurantRepository = new InMemoryRestaurantRepository();
    inMemoryStorageProvider = new InMemoryStorageProvider();
    createRestaurantService = new CreateRestaurantService(
      inMemoryRestaurantRepository,
      inMemoryStorageProvider,
    );
  });

  it('should be able to create a new restaurant without profile_photo', async () => {
    const fakeRestaurant = new Restaurant({
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: 'fake-user_id',
    }).restaurant;

    const restaurant = await createRestaurantService.execute(fakeRestaurant);

    expect(restaurant.id);
  });

  it('should be able create a new restaurant with phofile_photo', async () => {
    const fakeRestaurant = new Restaurant({
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      profile_photo: 'fake-profile_photo.png',
      user_id: 'fake-user_id',
    }).restaurant;

    if (fakeRestaurant.profile_photo) {
      let buffer: Buffer;

      fakeRestaurant.profile_photo = await inMemoryStorageProvider.saveFile({
        buffer,
        filename: fakeRestaurant.profile_photo,
      });
    }

    const restaurant = await createRestaurantService.execute(fakeRestaurant);

    expect(restaurant.id);
  });
});
