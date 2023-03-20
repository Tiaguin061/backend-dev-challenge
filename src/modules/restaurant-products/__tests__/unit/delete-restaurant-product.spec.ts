import { describe, expect, it } from '@jest/globals';

import { AbstractDeleteUniqueRestaurantProductService } from '@root/modules/restaurant-products/domain/services/restaurant-product-services';
import { BadRequestException } from '@nestjs/common';
import { DeleteUniqueRestaurantProductService } from '../../services/delete-unique-restaurant-product.service';
import { IRestaurantProduct } from '@root/modules/restaurant-products/domain/entities/restaurant-product';
import { InMemoryRestaurantProductRepository } from '../inMemory/in-memory-restaurant-product-repository';
import { InMemoryStorageProvider } from '../inMemory/storage-provider';
import { RestaurantProductRepository } from '@root/modules/restaurant-products/domain/repositories/restaurant-product-repository';
import { StorageProvider } from '@root/shared/providers/storageProvider/models/storage-provider';

let inMemoryRestaurantProductRepository: RestaurantProductRepository;
let deleteUniqueRestaurantService: AbstractDeleteUniqueRestaurantProductService;
let inMemoryStorageProvider: StorageProvider;

describe('delete-unique-restaurant', () => {
  beforeEach(() => {
    inMemoryRestaurantProductRepository =
      new InMemoryRestaurantProductRepository();
    inMemoryStorageProvider = new InMemoryStorageProvider();
    deleteUniqueRestaurantService = new DeleteUniqueRestaurantProductService(
      inMemoryRestaurantProductRepository,
      inMemoryStorageProvider,
    );
  });

  it("should be able to show an error if the restaurant product doesn't exist", async () => {
    await expect(
      deleteUniqueRestaurantService.execute('fake-restaurant-product-id'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should be able delete a unique restaurant without profile_photo', async () => {
    const fakeRestaurantProduct: IRestaurantProduct = {
      name: 'fake-name',
      price: 1000,
      product_category_id: 'fake-product-category-id',
      restaurant_id: 'fake-restaurant-id',
    };

    const restaurantProductCreated =
      await inMemoryRestaurantProductRepository.create(fakeRestaurantProduct);

    const deleteUniqueRestaurantById = jest.spyOn(
      inMemoryRestaurantProductRepository,
      'deleteUniqueById',
    );

    await deleteUniqueRestaurantService.execute(restaurantProductCreated.id);

    expect(deleteUniqueRestaurantById).toHaveBeenCalledWith(
      restaurantProductCreated.id,
    );
  });

  it('should be able delete a unique restaurant with profile_photo', async () => {
    const fakeRestaurantProduct: IRestaurantProduct = {
      name: 'fake-name',
      price: 1000,
      product_category_id: 'fake-product-category-id',
      restaurant_id: 'fake-restaurant-product-id',
      profile_photo: 'fake-profile-photo.png',
    };

    const restaurantProductCreated =
      await inMemoryRestaurantProductRepository.create(fakeRestaurantProduct);

    const deleteFile = jest.spyOn(inMemoryStorageProvider, 'deleteFile');

    await deleteUniqueRestaurantService.execute(restaurantProductCreated.id);

    expect(deleteFile).toReturn();
  });
});
