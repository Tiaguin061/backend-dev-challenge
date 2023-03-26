import { describe, expect, it } from '@jest/globals';

import { AbstractCreateRestaurantProductService } from '@root/modules/restaurant-products/domain/services/restaurant-product-services';
import { BadRequestException } from '@nestjs/common';
import { CreateRestaurantProductService } from '@root/modules/restaurant-products/services/create-restaurant-product.service';
import { IRestaurantProduct } from '@root/modules/restaurant-products/domain/entities/restaurant-product';
import { IRestaurantProductPromotion } from '@root/modules/restaurant-product-promotion/domain/entities/restaurant-product-promotion';
import { IRestaurantProps } from '@root/modules/restaurant/domain/entities/restaurant';
import { InMemoryRestaurantProductCategoryRepository } from '@root/modules/restaurant-product-category/__tests__/inMemory/restaurant-product-category-repository';
import { InMemoryRestaurantProductPromotionRepository } from '@root/modules/restaurant-product-promotion/__tests__/inMemory/restaurant-product-promotion-repository';
import { InMemoryRestaurantProductRepository } from '../inMemory/in-memory-restaurant-product-repository';
import { InMemoryRestaurantRepository } from '@root/modules/restaurant/__tests__/inMemory/restaurant-repository';
import { InMemoryStorageProvider } from '../inMemory/storage-provider';
import { RestaurantProductCategoryRepository } from '@root/modules/restaurant-product-category/domain/repositories/restaurant-product-category-repository';
import { RestaurantProductPromotionRepository } from '@root/modules/restaurant-product-promotion/domain/repositories/restaurant-product-promotion-repository';
import { RestaurantProductRepository } from '@root/modules/restaurant-products/domain/repositories/restaurant-product-repository';
import { RestaurantRepository } from '@root/modules/restaurant/domain/repositories/restaurant-repository';
import { StorageProvider } from '@root/shared/providers/storageProvider/models/storage-provider';

let inMemoryRestaurantProductRepository: RestaurantProductRepository;
let inMemoryRestaurantProductPromotionRepository: RestaurantProductPromotionRepository;
let inMemoryRestaurantRepository: RestaurantRepository;
let restaurantProductCategoryRepository: RestaurantProductCategoryRepository;

let inMemoryStorageProvider: StorageProvider;

let createRestaurantProductService: AbstractCreateRestaurantProductService;

describe('create-restaurant-product', () => {
  beforeEach(() => {
    inMemoryRestaurantProductRepository =
      new InMemoryRestaurantProductRepository();
    inMemoryRestaurantProductPromotionRepository =
      new InMemoryRestaurantProductPromotionRepository();
    inMemoryStorageProvider = new InMemoryStorageProvider();
    inMemoryRestaurantRepository = new InMemoryRestaurantRepository();
    restaurantProductCategoryRepository =
      new InMemoryRestaurantProductCategoryRepository();

    createRestaurantProductService = new CreateRestaurantProductService(
      inMemoryRestaurantProductRepository,
      inMemoryRestaurantProductPromotionRepository,
      inMemoryStorageProvider,
      inMemoryRestaurantRepository,
      restaurantProductCategoryRepository,
    );
  });

  it('should be able to show an error if restaurant does not exist', async () => {
    const fakeRestaurantProduct: IRestaurantProduct = {
      name: 'fake-name',
      price: 1000,
      product_category_id: 'fake-category-id',
      restaurant_id: 'fake-restaurant-id',
    };

    await expect(
      createRestaurantProductService.execute({
        restaurant_product: fakeRestaurantProduct,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should be able to show an error if restaurant product category does not exist', async () => {
    const fakeRestaurant: IRestaurantProps = {
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
      product_category_id: 'fake-category-id',
      restaurant_id: restaurantCreated.id,
    };

    await expect(
      createRestaurantProductService.execute({
        restaurant_product: fakeRestaurantProduct,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should be able to create a new restaurant product without profile_photo', async () => {
    const fakeRestaurant: IRestaurantProps = {
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: 'fake-user_id',
    };

    const restaurantCreated = await inMemoryRestaurantRepository.create(
      fakeRestaurant,
    );

    const category = await restaurantProductCategoryRepository.create({
      name: 'fake-name',
      restaurant_id: restaurantCreated.id,
    });

    const fakeRestaurantProduct: IRestaurantProduct = {
      name: 'fake-name',
      price: 1000,
      product_category_id: category.id,
      restaurant_id: restaurantCreated.id,
    };

    const restaurantProduct = await createRestaurantProductService.execute({
      restaurant_product: fakeRestaurantProduct,
    });

    expect(restaurantProduct.id);
  });

  it('should be able create a new restaurant product with phofile_photo', async () => {
    const fakeRestaurant: IRestaurantProps = {
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: 'fake-user_id',
    };

    const restaurantCreated = await inMemoryRestaurantRepository.create(
      fakeRestaurant,
    );

    const category = await restaurantProductCategoryRepository.create({
      name: 'fake-name',
      restaurant_id: restaurantCreated.id,
    });

    const fakeRestaurantProduct: IRestaurantProduct = {
      name: 'fake-name',
      price: 1000,
      product_category_id: category.id,
      restaurant_id: restaurantCreated.id,
    };

    const saveFile = jest.spyOn(inMemoryStorageProvider, 'saveFile');

    let buffer: Buffer;

    await createRestaurantProductService.execute({
      restaurant_product: {
        ...fakeRestaurantProduct,
        profile_photo_file: {
          buffer,
          originalname: 'profile_photo.png',
        } as CustomFile.File,
      },
    });

    expect(saveFile).toHaveBeenCalledWith({
      buffer,
      filename: 'profile_photo.png',
    });
  });

  it('should be able create a restaurant product promotion if the product and create a promotion', async () => {
    const fakeRestaurant: IRestaurantProps = {
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: 'fake-user_id',
    };

    const restaurantCreated = await inMemoryRestaurantRepository.create(
      fakeRestaurant,
    );

    const category = await restaurantProductCategoryRepository.create({
      name: 'fake-name',
      restaurant_id: restaurantCreated.id,
    });

    const fakeRestaurantProduct: IRestaurantProduct = {
      name: 'fake-name',
      price: 1000,
      product_category_id: category.id,
      restaurant_id: restaurantCreated.id,
    };

    const fakeRestaurantProductPromotion: IRestaurantProductPromotion = {
      description: 'fake-description',
      promotional_price: 500,
      restaurant_product_id: 'fake-restaurant-product-id',
      start_promotion_date: new Date(),
    };

    const restaurantProductCreated =
      await createRestaurantProductService.execute({
        restaurant_product: fakeRestaurantProduct,
        restaurant_product_promotion: fakeRestaurantProductPromotion,
      });

    expect(restaurantProductCreated?.restaurantProductPromotions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          promotional_price: 500,
        }),
      ]),
    );
  });
});
