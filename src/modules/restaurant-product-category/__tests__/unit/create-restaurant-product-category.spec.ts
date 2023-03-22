import { describe, expect, it } from '@jest/globals';

import { AbstractCreateRestaurantProductCategoryService } from '../../domain/services/restaurant-product-category-services';
import { BadRequestException } from '@nestjs/common';
import { CreateRestaurantProductCategoryService } from '../../services/create-restaurant-product-category.service';
import { IRestaurant } from '@root/modules/restaurant/domain/entities/restaurant';
import { IRestaurantProductCategory } from '../../domain/entities/restaurant-product-category';
import { InMemoryRestaurantProductCategoryRepository } from '../inMemory/restaurant-product-category-repository';
import { InMemoryRestaurantRepository } from '@root/modules/restaurant/__tests__/inMemory/restaurant-repository';
import { RestaurantProductCategoryRepository } from '../../domain/repositories/restaurant-product-category-repository';
import { RestaurantRepository } from '@root/modules/restaurant/domain/repositories/restaurant-repository';

let inMemoryRestaurantProductCategoryRepository: RestaurantProductCategoryRepository;
let inMemoryRestaurantRepository: RestaurantRepository;

let createRestaurantProductCategoryService: AbstractCreateRestaurantProductCategoryService;

describe('Create restaurant product category', () => {
  beforeEach(() => {
    inMemoryRestaurantProductCategoryRepository =
      new InMemoryRestaurantProductCategoryRepository();
    inMemoryRestaurantRepository = new InMemoryRestaurantRepository();

    createRestaurantProductCategoryService =
      new CreateRestaurantProductCategoryService(
        inMemoryRestaurantProductCategoryRepository,
        inMemoryRestaurantRepository,
      );
  });

  it('should be able to show an error if restaurant does not exist', async () => {
    const fakeRestaurantProductCategory: IRestaurantProductCategory = {
      name: 'fake-name',
      restaurant_id: 'fake-restaurant-id',
    };

    await expect(
      createRestaurantProductCategoryService.execute(
        fakeRestaurantProductCategory,
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should be able to create a new restaurant product category', async () => {
    const fakeRestaurant: IRestaurant = {
      name: 'fake-name',
      address: 'address',
      opening_hour: 'seg - sex 08 às 18h',
      user_id: 'user_id',
    };

    const restaurantCreated = await inMemoryRestaurantRepository.create(
      fakeRestaurant,
    );

    const fakeRestaurantProductCategory: IRestaurantProductCategory = {
      name: 'fake-name',
      restaurant_id: restaurantCreated.id,
    };

    const restaurantProductCategory =
      await createRestaurantProductCategoryService.execute(
        fakeRestaurantProductCategory,
      );

    expect(restaurantProductCategory.name).toBe('fake-name');
  });
});
