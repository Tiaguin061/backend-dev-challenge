import { describe, expect, it } from '@jest/globals';

import { AbstractDeleteUniqueRestaurantService } from '../../domain/services/restaurant-services';
import { BadRequestException } from '@nestjs/common';
import { DeleteUniqueRestaurantService } from '../../services/delete-unique-restaurant.service';
import { IRestaurantProps } from '../../domain/entities/restaurant';
import { InMemoryRestaurantRepository } from '../inMemory/restaurant-repository';
import { InMemoryStorageProvider } from '../inMemory/storage-provider';
import { RestaurantRepository } from '../../domain/repositories/restaurant-repository';
import { StorageProvider } from '@root/shared/providers/storageProvider/models/storage-provider';

let inMemoryRestaurantRepository: RestaurantRepository;
let deleteUniqueRestaurantService: AbstractDeleteUniqueRestaurantService;
let inMemoryStorageProvider: StorageProvider;

describe('delete-unique-restaurant', () => {
  beforeEach(() => {
    inMemoryRestaurantRepository = new InMemoryRestaurantRepository();
    inMemoryStorageProvider = new InMemoryStorageProvider();
    deleteUniqueRestaurantService = new DeleteUniqueRestaurantService(
      inMemoryRestaurantRepository,
      inMemoryStorageProvider,
    );
  });

  it("should be able to show an error if the restaurant doesn't exist", async () => {
    await expect(
      deleteUniqueRestaurantService.execute('fake-restaurant-id'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should be able delete a unique restaurant without profile_photo', async () => {
    const fakeRestaurant: IRestaurantProps = {
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: 'fake-user_id',
    };

    const restaurantCreated = await inMemoryRestaurantRepository.create(
      fakeRestaurant,
    );

    const deleteUniqueRestaurantById = jest.spyOn(
      inMemoryRestaurantRepository,
      'deleteUniqueById',
    );

    await deleteUniqueRestaurantService.execute(restaurantCreated.id);

    expect(deleteUniqueRestaurantById).toHaveBeenCalledWith(
      restaurantCreated.id,
    );
  });

  it('should be able delete a unique restaurant with profile_photo', async () => {
    const fakeRestaurant: IRestaurantProps = {
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: 'fake-user_id',
      profile_photo: 'profile_photo.png',
    };

    const restaurantCreated = await inMemoryRestaurantRepository.create(
      fakeRestaurant,
    );

    const deleteFile = jest.spyOn(inMemoryStorageProvider, 'deleteFile');

    await deleteUniqueRestaurantService.execute(restaurantCreated.id);

    expect(deleteFile).toHaveBeenCalledWith(restaurantCreated.profile_photo);
  });
});
