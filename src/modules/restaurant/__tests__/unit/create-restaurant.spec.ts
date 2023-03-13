import { describe, expect, it } from '@jest/globals';

import { CreateRestaurantService } from '../../services/create-restaurant.service';
import { InMemoryRestaurantRepository } from '../inMemory/restaurant-repository';
import { Restaurant } from '../../domain/entities/restaurant';
import { RestaurantRepository } from '../../domain/repositories/restaurant-repository';
import { StorageProvider } from 'src/shared/providers/storageProvider/models/storage-provider';

let inMemoryRestaurantRepository: RestaurantRepository;
let inMemoryStorageProvider: StorageProvider;
let createRestaurant: CreateRestaurantService;

describe('create-restaurant', () => {
  beforeEach(() => {
    inMemoryRestaurantRepository = new InMemoryRestaurantRepository();
    createRestaurant = new CreateRestaurantService(
      inMemoryRestaurantRepository,
      inMemoryStorageProvider,
    );
  });

  it('should be able create a new restaurant', async () => {
    const fakeRestaurant = new Restaurant({
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      profile_photo: 'fake-profile_photo.png',
      user_id: 'fake-user_id',
    });

    const restaurant = await createRestaurant.execute(fakeRestaurant);

    expect(restaurant.id);
  });
});
