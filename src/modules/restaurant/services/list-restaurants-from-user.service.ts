import { BadRequestException, Injectable } from '@nestjs/common';

import { AbstractListRestaurantsFromUserService } from '@root/modules/restaurant/domain/services/restaurant-services';
import { UserRepository } from '@root/modules/user/domain/repositories/user-respository';

@Injectable()
export class ListRestaurantsFromUserService
  implements AbstractListRestaurantsFromUserService
{
  constructor(private userRepository: UserRepository) {}
  async execute(user_id: string) {
    const userWithRestaurants =
      await this.userRepository.findManyRestaurantsByUserId(user_id);

    if (!userWithRestaurants) {
      throw new BadRequestException('User does not exist.');
    }

    return userWithRestaurants;
  }
}
