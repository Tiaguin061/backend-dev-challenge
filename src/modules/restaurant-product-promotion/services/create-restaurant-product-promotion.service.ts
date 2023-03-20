import { BadRequestException, Injectable } from '@nestjs/common';

import { AbstractCreateRestaurantProductPromotionService } from '@root/modules/restaurant-product-promotion/domain/services/restaurant-product-promotion-services';
import { CreateRestaurantProductPromotionServiceData } from '../domain/services/types';
import { RestaurantProductPromotionRepository } from '@root/modules/restaurant-product-promotion/domain/repositories/restaurant-product-promotion-repository';
import { RestaurantProductRepository } from '@root/modules/restaurant-products/domain/repositories/restaurant-product-repository';

@Injectable()
export class CreateRestaurantProductPromotionService
  implements AbstractCreateRestaurantProductPromotionService
{
  constructor(
    private restaurantProductPromotionRepository: RestaurantProductPromotionRepository,
    private restaurantProductRepository: RestaurantProductRepository,
  ) {}
  async execute(data: CreateRestaurantProductPromotionServiceData) {
    const foundRestaurantProduct =
      await this.restaurantProductRepository.findUniqueById(
        data.restaurant_product_id,
      );

    if (!foundRestaurantProduct) {
      throw new BadRequestException('Restaurant product does not exist.');
    }

    const restaurantProductPromotion =
      await this.restaurantProductPromotionRepository.create(data);

    return restaurantProductPromotion;
  }
}
