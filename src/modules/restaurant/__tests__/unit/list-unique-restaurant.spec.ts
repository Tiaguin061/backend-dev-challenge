import { describe, expect, it } from '@jest/globals';

import { AbstractListUniqueRestaurantService } from '../../domain/services/restaurant-services';
import { BadRequestException } from '@nestjs/common';
import { IRestaurantProps } from '../../domain/entities/restaurant';
import { InMemoryRestaurantRepository } from '../inMemory/restaurant-repository';
import { ListUniqueRestaurantService } from '../../services/list-unique-restaurant.service';
import { RestaurantRepository } from '../../domain/repositories/restaurant-repository';

let inMemoryRestaurantRepository: RestaurantRepository;
let listUniqueRestaurantService: AbstractListUniqueRestaurantService;

describe('list-unique-restaurant', () => {
  beforeEach(() => {
    inMemoryRestaurantRepository = new InMemoryRestaurantRepository();
    listUniqueRestaurantService = new ListUniqueRestaurantService(
      inMemoryRestaurantRepository,
    );
  });

  it("should be able to show an error if the restaurant doesn't exist", async () => {
    await expect(
      listUniqueRestaurantService.execute('fake-restaurant-id'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should be able list a unique restaurant', async () => {
    const fakeRestaurant: IRestaurantProps = {
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: 'fake-user_id',
    };

    const restaurantCreated = await inMemoryRestaurantRepository.create(
      fakeRestaurant,
    );

    const restaurant = await listUniqueRestaurantService.execute(
      restaurantCreated.id,
    );

    expect(restaurant.id);
  });
});
