import { describe, expect, it } from '@jest/globals';

import { AbstractUpdateUniqueRestaurantProductService } from '../../domain/services/restaurant-product-services';
import { BadRequestException } from '@nestjs/common';
import { IRestaurant } from '@root/modules/restaurant/domain/entities/restaurant';
import { IRestaurantProduct } from '../../domain/entities/restaurant-product';
import { IRestaurantProductPromotion } from '@root/modules/restaurant-product-promotion/domain/entities/restaurant-product-promotion';
import { InMemoryRestaurantProductPromotionRepository } from '@root/modules/restaurant-product-promotion/__tests__/inMemory/restaurant-product-promotion-repository';
import { InMemoryRestaurantProductRepository } from '../inMemory/in-memory-restaurant-product-repository';
import { InMemoryRestaurantRepository } from '@root/modules/restaurant/__tests__/inMemory/restaurant-repository';
import { InMemoryStorageProvider } from '../inMemory/storage-provider';
import { RestaurantProductPromotionRepository } from '@root/modules/restaurant-product-promotion/domain/repositories/restaurant-product-promotion-repository';
import { RestaurantProductRepository } from '../../domain/repositories/restaurant-product-repository';
import { RestaurantRepository } from '@root/modules/restaurant/domain/repositories/restaurant-repository';
import { StorageProvider } from '@root/shared/providers/storageProvider/models/storage-provider';
import { UpdateUniqueRestaurantProductService } from '../../services/update-unique-restaurant-product.service';

let inMemoryRestaurantProductRepository: RestaurantProductRepository;
let inMemoryRestaurantRepository: RestaurantRepository;
let inMemoryRestaurantProductPromotionRepository: RestaurantProductPromotionRepository;

let inMemoryStorageProvider: StorageProvider;

let updateUniqueRestaurantProductService: AbstractUpdateUniqueRestaurantProductService;

describe('update-restaurant', () => {
  beforeEach(() => {
    inMemoryRestaurantProductRepository =
      new InMemoryRestaurantProductRepository();
    inMemoryRestaurantRepository = new InMemoryRestaurantRepository();
    inMemoryRestaurantProductPromotionRepository =
      new InMemoryRestaurantProductPromotionRepository();
    inMemoryStorageProvider = new InMemoryStorageProvider();

    updateUniqueRestaurantProductService =
      new UpdateUniqueRestaurantProductService(
        inMemoryRestaurantProductRepository,
        inMemoryStorageProvider,
        inMemoryRestaurantProductPromotionRepository,
      );
  });

  it('should be able to show an error if restaurant product does not exist', async () => {
    await expect(
      updateUniqueRestaurantProductService.execute({
        data: {},
        restaurant_product_id: 'fake-id',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should be able to update a restaurant without profile_photo', async () => {
    const fakeRestaurant: IRestaurant = {
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: 'fake-user_id',
    };

    const restaurantCreated = await inMemoryRestaurantRepository.create(
      fakeRestaurant,
    );

    const fakeRestaurantProduct: IRestaurantProduct = {
      name: 'fake-name',
      price: 1000,
      product_category_id: 'fake-product-category-id',
      restaurant_id: restaurantCreated.id,
    };

    const fakeRestaurantProductCreated =
      await inMemoryRestaurantProductRepository.create(fakeRestaurantProduct);

    const fakeRestaurantProductToUpdate: IRestaurantProduct = {
      name: 'fake-name-updated',
      price: 1000,
      product_category_id: 'fake-product-category-id',
      restaurant_id: restaurantCreated.id,
    };

    const restaurantProductUpdated =
      await updateUniqueRestaurantProductService.execute({
        data: {
          restaurant_product: fakeRestaurantProductToUpdate,
        },
        restaurant_product_id: fakeRestaurantProductCreated.id,
      });

    expect(restaurantProductUpdated.name).toEqual('fake-name-updated');
  });

  it("should be able to update a restaurant's phofile_photo if phofile_photo already exists", async () => {
    const fakeRestaurant: IRestaurant = {
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: 'fake-user_id',
    };

    const restaurantCreated = await inMemoryRestaurantRepository.create(
      fakeRestaurant,
    );

    const fakeRestaurantProduct: IRestaurantProduct = {
      name: 'fake-name',
      price: 1000,
      product_category_id: 'fake-product-category-id',
      profile_photo: 'fake-profile-photo.png',
      restaurant_id: restaurantCreated.id,
    };

    const fakeRestaurantProductCreated =
      await inMemoryRestaurantProductRepository.create(fakeRestaurantProduct);

    const updateFile = jest.spyOn(inMemoryStorageProvider, 'updateFile');

    let buffer: Buffer;

    await updateUniqueRestaurantProductService.execute({
      restaurant_product_id: fakeRestaurantProductCreated.id,
      data: {
        restaurant_product: {
          ...fakeRestaurantProductCreated,
          profile_photo_file: {
            buffer,
            originalname: 'new_profile_photo.png',
          } as CustomFile.File,
        },
      },
    });

    expect(updateFile).toHaveBeenCalledWith({
      newFilename: 'new_profile_photo.png',
      oldFilename: fakeRestaurantProductCreated.profile_photo,
      newFilenameBuffer: buffer,
    });
  });

  it('should be able to save the phofile_photo of a restaurant product if phofile_photo does not exist', async () => {
    const fakeRestaurant: IRestaurant = {
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: 'fake-user_id',
    };

    const restaurantCreated = await inMemoryRestaurantRepository.create(
      fakeRestaurant,
    );

    const fakeRestaurantProduct: IRestaurantProduct = {
      name: 'fake-name',
      price: 1000,
      product_category_id: 'fake-product-category-id',
      restaurant_id: restaurantCreated.id,
    };

    const fakeRestaurantProductCreated =
      await inMemoryRestaurantProductRepository.create(fakeRestaurantProduct);

    const saveFile = jest.spyOn(inMemoryStorageProvider, 'saveFile');

    let buffer: Buffer;

    await updateUniqueRestaurantProductService.execute({
      restaurant_product_id: fakeRestaurantProductCreated.id,
      data: {
        restaurant_product: {
          ...fakeRestaurantProductCreated,
          profile_photo_file: {
            buffer,
            originalname: 'new_profile_photo.png',
          } as CustomFile.File,
        },
      },
    });

    expect(saveFile).toHaveBeenCalledWith({
      buffer,
      filename: 'new_profile_photo.png',
    });
  });

  it('should be able to update a restaurant product promotion', async () => {
    const fakeRestaurant: IRestaurant = {
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: 'fake-user_id',
    };

    const restaurantCreated = await inMemoryRestaurantRepository.create(
      fakeRestaurant,
    );

    const fakeRestaurantProduct: IRestaurantProduct = {
      name: 'fake-name',
      price: 1000,
      product_category_id: 'fake-product-category-id',
      restaurant_id: restaurantCreated.id,
    };

    const fakeRestaurantProductCreated =
      await inMemoryRestaurantProductRepository.create(fakeRestaurantProduct);

    const fakeRestaurantProductPromotion: IRestaurantProductPromotion = {
      description: 'fake-description',
      promotional_price: 500,
      restaurant_product_id: fakeRestaurantProductCreated.id,
      start_promotion_date: new Date(),
    };

    const restaurantProductPromotionCreated =
      await inMemoryRestaurantProductPromotionRepository.create(
        fakeRestaurantProductPromotion,
      );

    const promotionToUpdate = {
      ...restaurantProductPromotionCreated,
      description: 'fake-description-updated',
    };

    const expectedResult = {
      ...fakeRestaurantProductCreated,
      restaurantProductPromotions: [promotionToUpdate],
    };

    jest
      .spyOn(inMemoryRestaurantProductRepository, 'updateUnique')
      .mockImplementationOnce(async () => {
        return expectedResult;
      });

    const restaurantProductUpdated =
      await updateUniqueRestaurantProductService.execute({
        data: {
          restaurant_product_promotion: promotionToUpdate,
        },
        restaurant_product_id: fakeRestaurantProductCreated.id,
      });

    expect(restaurantProductUpdated).toEqual(
      expect.objectContaining(expectedResult),
    );
  });

  it('should be able to show an error if restaurant product promotion does not exist', async () => {
    const fakeRestaurantProduct: IRestaurantProduct = {
      name: 'fake-name',
      price: 1000,
      product_category_id: 'fake-product-category-id',
      restaurant_id: 'fake-restaurant-id',
    };

    const fakeRestaurantProductCreated =
      await inMemoryRestaurantProductRepository.create(fakeRestaurantProduct);

    await expect(
      updateUniqueRestaurantProductService.execute({
        data: {
          restaurant_product_promotion: {
            id: 'fake-id',
          },
        },
        restaurant_product_id: fakeRestaurantProductCreated.id,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
