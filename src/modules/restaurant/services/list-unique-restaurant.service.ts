import { BadRequestException, Injectable } from '@nestjs/common';

import { AbstractListUniqueRestaurantService } from '@root/modules/restaurant/domain/services/restaurant-services';
import { IRestaurant } from '@root/modules/restaurant/domain/entities/restaurant';
import { RestaurantRepository } from '@root/modules/restaurant/domain/repositories/restaurant-repository';

@Injectable()
export class ListUniqueRestaurantService
  implements AbstractListUniqueRestaurantService
{
  constructor(private restaurantRepository: RestaurantRepository) {}
  public async execute(restaurant_id: string): Promise<IRestaurant> {
    const foundRestaurant = await this.restaurantRepository.findUniqueById(
      restaurant_id,
    );

    if (!foundRestaurant) {
      throw new BadRequestException('Restaurant does not exist');
    }

    return foundRestaurant;
  }
}
