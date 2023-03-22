import { BadRequestException, Injectable } from '@nestjs/common';

import { AbstractListProductsFromRestaurantService } from '../domain/services/restaurant-product-services';
import { RestaurantRepository } from '@root/modules/restaurant/domain/repositories/restaurant-repository';

@Injectable()
export class ListProductsFromRestaurantService
  implements AbstractListProductsFromRestaurantService
{
  constructor(private restaurantRepository: RestaurantRepository) {}
  async execute(restaurant_id: string) {
    const restaurant =
      await this.restaurantRepository.listManyProductFromRestaurantId(
        restaurant_id,
      );

    if (!restaurant) {
      throw new BadRequestException('Restaurant does not exist.');
    }

    return restaurant;
  }
}
