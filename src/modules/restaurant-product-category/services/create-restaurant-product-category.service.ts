import { BadRequestException, Injectable } from '@nestjs/common';

import { AbstractCreateRestaurantProductCategoryService } from '../domain/services/restaurant-product-category-services';
import { CreateRestaurantProductCategoryServiceData } from '../domain/services/types';
import { RestaurantProductCategoryRepository } from '../domain/repositories/restaurant-product-category-repository';
import { RestaurantRepository } from '@root/modules/restaurant/domain/repositories/restaurant-repository';

@Injectable()
export class CreateRestaurantProductCategoryService
  implements AbstractCreateRestaurantProductCategoryService
{
  constructor(
    private restaurantProductCategoryRepository: RestaurantProductCategoryRepository,
    private restaurantRepository: RestaurantRepository,
  ) {}
  async execute(data: CreateRestaurantProductCategoryServiceData) {
    const foundRestaurantProduct =
      await this.restaurantRepository.findUniqueById(data.restaurant_id);

    if (!foundRestaurantProduct) {
      throw new BadRequestException('Restaurant does not exist.');
    }

    const restaurantProductCategory =
      await this.restaurantProductCategoryRepository.create(data);

    return restaurantProductCategory;
  }
}
