import { describe, expect, it } from '@jest/globals';

import { AbstractListProductsFromRestaurantService } from '../../domain/services/restaurant-product-services';
import { BadRequestException } from '@nestjs/common';
import { IRestaurant } from '@root/modules/restaurant/domain/entities/restaurant';
import { IRestaurantProduct } from '../../domain/entities/restaurant-product';
import { IRestaurantProductPromotion } from '@root/modules/restaurant-product-promotion/domain/entities/restaurant-product-promotion';
import { InMemoryRestaurantProductPromotionRepository } from '@root/modules/restaurant-product-promotion/__tests__/inMemory/restaurant-product-promotion-repository';
import { InMemoryRestaurantProductRepository } from '../inMemory/in-memory-restaurant-product-repository';
import { InMemoryRestaurantRepository } from '@root/modules/restaurant/__tests__/inMemory/restaurant-repository';
import { ListProductsFromRestaurantService } from '../../services/list-products-from-restaurant.service';
import { RestaurantProductPromotionRepository } from '@root/modules/restaurant-product-promotion/domain/repositories/restaurant-product-promotion-repository';
import { RestaurantProductRepository } from '../../domain/repositories/restaurant-product-repository';
import { RestaurantRepository } from '@root/modules/restaurant/domain/repositories/restaurant-repository';

let inMemoryRestaurantRepository: RestaurantRepository;
let inMemoryRestaurantProductsRepository: RestaurantProductRepository;
let inMemoryRestaurantProductPromotionRepository: RestaurantProductPromotionRepository;
let listProductsFromRestaurantService: AbstractListProductsFromRestaurantService;

describe('list-products-from-restaurant', () => {
  beforeEach(() => {
    inMemoryRestaurantRepository = new InMemoryRestaurantRepository();
    inMemoryRestaurantProductPromotionRepository =
      new InMemoryRestaurantProductPromotionRepository();
    inMemoryRestaurantProductsRepository =
      new InMemoryRestaurantProductRepository();
    listProductsFromRestaurantService = new ListProductsFromRestaurantService(
      inMemoryRestaurantRepository,
    );
  });

  it("should be able show error if the restaurant doesn't not exist", async () => {
    await expect(
      listProductsFromRestaurantService.execute('fake-restaurant-product-id'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should be able list products with promotions from restaurant', async () => {
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
      await inMemoryRestaurantProductsRepository.create(fakeRestaurantProduct);

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

    const expectedResult: IRestaurant = {
      ...restaurantCreated,
      restaurantProducts: [
        {
          ...fakeRestaurantProductCreated,
          restaurantProductPromotions: [restaurantProductPromotionCreated],
        },
      ],
    };

    jest
      .spyOn(inMemoryRestaurantRepository, 'findUniqueById')
      .mockImplementationOnce(async () => {
        return expectedResult;
      });

    const foundRestaurant = await listProductsFromRestaurantService.execute(
      restaurantCreated.id,
    );

    expect(foundRestaurant).toEqual(
      expect.objectContaining({
        ...expectedResult,
      }),
    );
  });
});
