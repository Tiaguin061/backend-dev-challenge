import { describe, expect, it } from '@jest/globals';

import { AbstractListRestaurantsService } from '../../domain/services/restaurant-services';
import { InMemoryRestaurantRepository } from '../inMemory/restaurant-repository';
import { ListRestaurantsService } from '../../services/list-restaurants.service';
import { RestaurantRepository } from '../../domain/repositories/restaurant-repository';

let inMemoryRestaurantRepository: RestaurantRepository;
let listRestaurantService: AbstractListRestaurantsService;

describe('list-restaurants', () => {
  beforeEach(() => {
    inMemoryRestaurantRepository = new InMemoryRestaurantRepository();
    listRestaurantService = new ListRestaurantsService(
      inMemoryRestaurantRepository,
    );
  });

  it('should be able list restaurants', async () => {
    const restaurants = await listRestaurantService.execute();

    expect.arrayContaining(restaurants);
  });
});
