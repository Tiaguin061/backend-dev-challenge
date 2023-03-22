import { describe, expect, it } from '@jest/globals';

import { AbstractListProductsFromRestaurantService } from '../../domain/services/restaurant-product-services';
import { BadRequestException } from '@nestjs/common';
import { IRestaurant } from '@root/modules/restaurant/domain/entities/restaurant';
import { InMemoryRestaurantRepository } from '@root/modules/restaurant/__tests__/inMemory/restaurant-repository';
import { ListProductsFromRestaurantService } from '../../services/list-products-from-restaurant.service';
import { RestaurantRepository } from '@root/modules/restaurant/domain/repositories/restaurant-repository';

let inMemoryRestaurantRepository: RestaurantRepository;

let listProductsFromRestaurantService: AbstractListProductsFromRestaurantService;

describe('List products from restaurant', () => {
  beforeEach(() => {
    inMemoryRestaurantRepository = new InMemoryRestaurantRepository();

    listProductsFromRestaurantService = new ListProductsFromRestaurantService(
      inMemoryRestaurantRepository,
    );
  });

  it("should be able show error if the restaurant doesn't not exist", async () => {
    await expect(
      listProductsFromRestaurantService.execute('fake-restaurant-product-id'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should be able list category array contain products from restaurant', async () => {
    const fakeRestaurant: IRestaurant = {
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: 'fake-user_id',
    };

    const restaurantCreated = await inMemoryRestaurantRepository.create(
      fakeRestaurant,
    );

    const expectedResult = {
      restaurant: restaurantCreated,
      restaurantProductsCategory: [],
    };

    jest
      .spyOn(inMemoryRestaurantRepository, 'listManyProductFromRestaurantId')
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
