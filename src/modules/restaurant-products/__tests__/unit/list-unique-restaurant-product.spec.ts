import { describe, expect, it } from '@jest/globals';

import { AbstractListUniqueRestaurantProductService } from '../../domain/services/restaurant-product-services';
import { BadRequestException } from '@nestjs/common';
import { IRestaurant } from '@root/modules/restaurant/domain/entities/restaurant';
import { IRestaurantProduct } from '../../domain/entities/restaurant-product';
import { IRestaurantProductPromotion } from '@root/modules/restaurant-product-promotion/domain/entities/restaurant-product-promotion';
import { InMemoryRestaurantProductPromotionRepository } from '@root/modules/restaurant-product-promotion/__tests__/inMemory/restaurant-product-promotion-repository';
import { InMemoryRestaurantProductRepository } from '../inMemory/in-memory-restaurant-product-repository';
import { InMemoryRestaurantRepository } from '@root/modules/restaurant/__tests__/inMemory/restaurant-repository';
import { ListUniqueRestaurantProductService } from '../../services/list-unique-restaurant-product.service';
import { RestaurantProductPromotionRepository } from '@root/modules/restaurant-product-promotion/domain/repositories/restaurant-product-promotion-repository';
import { RestaurantProductRepository } from '../../domain/repositories/restaurant-product-repository';
import { RestaurantRepository } from '@root/modules/restaurant/domain/repositories/restaurant-repository';

let inMemoryRestaurantProductRepository: RestaurantProductRepository;
let inMemoryRestaurantRepository: RestaurantRepository;
let listUniqueRestaurantProductService: AbstractListUniqueRestaurantProductService;
let inMemoryRestaurantProductPromotionRepository: RestaurantProductPromotionRepository;

describe('list-unique-restaurant', () => {
  beforeEach(() => {
    inMemoryRestaurantProductRepository =
      new InMemoryRestaurantProductRepository();
    inMemoryRestaurantProductPromotionRepository =
      new InMemoryRestaurantProductPromotionRepository();
    inMemoryRestaurantRepository = new InMemoryRestaurantRepository();
    listUniqueRestaurantProductService = new ListUniqueRestaurantProductService(
      inMemoryRestaurantProductRepository,
    );
  });

  it("should be able to show an error if the restaurant product doesn't exist", async () => {
    await expect(
      listUniqueRestaurantProductService.execute('fake-restaurant-product-id'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should be able list a unique restaurant product with promotions', async () => {
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

    const foundRestaurantProduct =
      await inMemoryRestaurantProductRepository.findUniqueById(
        fakeRestaurantProductCreated.id,
      );

    const fakeRestaurantProductPromotion: IRestaurantProductPromotion = {
      description: 'fake-description',
      promotional_price: 500,
      restaurant_product_id: fakeRestaurantProductCreated.id,
      start_promotion_date: new Date(),
    };

    const fakeRestaurantProductPromotionCreated =
      await inMemoryRestaurantProductPromotionRepository.create(
        fakeRestaurantProductPromotion,
      );

    const expectedResult: IRestaurantProduct = {
      ...foundRestaurantProduct,
      restaurantProductPromotions: [fakeRestaurantProductPromotionCreated],
      restaurant: restaurantCreated,
    };

    jest
      .spyOn(inMemoryRestaurantProductRepository, 'findUniqueById')
      .mockImplementationOnce(async () => {
        return expectedResult;
      });

    const restaurantProduct = await listUniqueRestaurantProductService.execute(
      foundRestaurantProduct.id,
    );

    expect(restaurantProduct).toBe(expectedResult);
  });
});
