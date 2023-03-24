import { describe, expect, it } from '@jest/globals';

import { AbstractListRestaurantsFromUserService } from '../../domain/services/restaurant-services';
import { BadRequestException } from '@nestjs/common';
import { BcryptProvider } from '@root/shared/providers/hashProvider/implementations/bcrypt-provider';
import { HashProvider } from '@root/shared/providers/hashProvider/models/hash-provider';
import { InMemoryRestaurantRepository } from '../inMemory/restaurant-repository';
import { InMemoryUserRepository } from '@root/modules/user/__tests__/inMemory/user-repository';
import { ListRestaurantsFromUserService } from '../../services/list-restaurants-from-user.service';
import { RestaurantRepository } from '../../domain/repositories/restaurant-repository';
import { UserRepository } from '@root/modules/user/domain/repositories/user-respository';

let inMemoryRestaurantRepository: RestaurantRepository;
let inMemoryUserRepository: UserRepository;
let listRestaurantsFromUserService: AbstractListRestaurantsFromUserService;
let hashProvider: HashProvider;

describe('list-restaurants', () => {
  beforeEach(() => {
    inMemoryRestaurantRepository = new InMemoryRestaurantRepository();
    hashProvider = new BcryptProvider();
    inMemoryUserRepository = new InMemoryUserRepository(hashProvider);
    listRestaurantsFromUserService = new ListRestaurantsFromUserService(
      inMemoryUserRepository,
    );
  });

  it('should be able list restaurants', async () => {
    const user = await inMemoryUserRepository.register({
      email: 'fake-email@email.com',
      name: 'fake-name',
      password: '123456',
    });

    const restaurant = await inMemoryRestaurantRepository.create({
      name: 'fake-name',
      address: 'fake-address',
      opening_hour: 'fake-opening_hour',
      user_id: user.id,
    });

    const restaurants = await listRestaurantsFromUserService.execute(user.id);

    expect(restaurants).toEqual(
      expect.objectContaining({
        user,
        restaurants: expect.arrayContaining([restaurant]),
      }),
    );
  });

  it('should not be able list restaurants if user does not exist', async () => {
    expect(
      await listRestaurantsFromUserService.execute('fake-user-id'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
