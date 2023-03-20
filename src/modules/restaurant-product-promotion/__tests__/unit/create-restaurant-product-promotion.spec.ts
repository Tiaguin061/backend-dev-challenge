import { describe, expect, it } from '@jest/globals';

import { AbstractCreateRestaurantProductPromotionService } from '@root/modules/restaurant-product-promotion/domain/services/restaurant-product-promotion-services';
import { BadRequestException } from '@nestjs/common';
import { CreateRestaurantProductPromotionService } from '@root/modules/restaurant-product-promotion/services/create-restaurant-product-promotion.service';
import { IRestaurantProduct } from '@root/modules/restaurant-products/domain/entities/restaurant-product';
import { IRestaurantProductPromotion } from '@root/modules/restaurant-product-promotion/domain/entities/restaurant-product-promotion';
import { InMemoryRestaurantProductPromotionRepository } from '@root/modules/restaurant-product-promotion/__tests__/inMemory/restaurant-product-promotion-repository';
import { InMemoryRestaurantProductRepository } from '@root/modules/restaurant-products/__tests__/inMemory/in-memory-restaurant-product-repository';
import { RestaurantProductPromotionRepository } from '@root/modules/restaurant-product-promotion/domain/repositories/restaurant-product-promotion-repository';
import { RestaurantProductRepository } from '@root/modules/restaurant-products/domain/repositories/restaurant-product-repository';

let inMemoryRestaurantProductPromotionRepository: RestaurantProductPromotionRepository;
let inMemoryRestaurantProductRepository: RestaurantProductRepository;

let createRestaurantProductPromotionService: AbstractCreateRestaurantProductPromotionService;

describe('create-restaurant-product-promotion', () => {
  beforeEach(() => {
    inMemoryRestaurantProductPromotionRepository =
      new InMemoryRestaurantProductPromotionRepository();
    inMemoryRestaurantProductRepository =
      new InMemoryRestaurantProductRepository();

    createRestaurantProductPromotionService =
      new CreateRestaurantProductPromotionService(
        inMemoryRestaurantProductPromotionRepository,
        inMemoryRestaurantProductRepository,
      );
  });

  it('should be able to show an error if restaurant product does not exist', async () => {
    const fakeRestaurantProductPromotion: IRestaurantProductPromotion = {
      description: 'description',
      promotional_price: 1000,
      restaurant_product_id: 'fake-restaurant-product-id',
      start_promotion_date: new Date(),
    };

    await expect(
      createRestaurantProductPromotionService.execute(
        fakeRestaurantProductPromotion,
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should be able to create a new restaurant product promotion', async () => {
    const fakeRestaurantProduct: IRestaurantProduct = {
      name: 'fake-name',
      price: 1000,
      product_category_id: 'fake-product-category-id',
      restaurant_id: 'fake-restaurant-id',
    };

    const restaurantProductCreated =
      await inMemoryRestaurantProductRepository.create(fakeRestaurantProduct);

    const fakeRestaurantProductPromotion: IRestaurantProductPromotion = {
      description: 'fake-description',
      promotional_price: 1000,
      restaurant_product_id: restaurantProductCreated.id,
      start_promotion_date: new Date(),
    };

    const restaurantProductPromotion =
      await createRestaurantProductPromotionService.execute(
        fakeRestaurantProductPromotion,
      );

    expect(restaurantProductPromotion.description).toBe('fake-description');
  });

  // it('should be able to show an error if restaurant product promotion if the start_promotion_date is less than end_promotion_date', async () => {
  //   const fakeRestaurantProductPromotion: IRestaurantProductPromotion = {
  //     description: 'description',
  //     promotional_price: 1000,
  //     restaurant_product_id: 'fake-restaurant-product-id',
  //     start_promotion_date: new Date('Sun Mar 19 2023 21:40:00 GMT-0300'),
  //     end_promotion_date: new Date('Sun Mar 19 2023 22:40:00 GMT-0300')
  //   };

  //   await expect(
  //     createRestaurantProductPromotionService.execute(
  //       fakeRestaurantProductPromotion,
  //     ),
  //   ).rejects.toBeInstanceOf(BadRequestException);
  // });
});
