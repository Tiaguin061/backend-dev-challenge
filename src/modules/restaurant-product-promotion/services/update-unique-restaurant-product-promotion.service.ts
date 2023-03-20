import { BadRequestException, Injectable } from '@nestjs/common';

import { AbstractUpdateUniqueRestaurantProductPromotionService } from '@root/modules/restaurant-product-promotion/domain/services/restaurant-product-promotion-services';
import { RestaurantProductPromotionRepository } from '@root/modules/restaurant-product-promotion/domain/repositories/restaurant-product-promotion-repository';
import { UpdateUniqueRestaurantProductPromotionServiceData } from '../domain/services/types';
import { mergeData } from '@root/shared/utils/mergeData';

@Injectable()
export class UpdateUniqueRestaurantProductPromotionService
  implements AbstractUpdateUniqueRestaurantProductPromotionService
{
  constructor(
    private restaurantProductPromotionRepository: RestaurantProductPromotionRepository,
  ) {}
  async execute({
    data,
    restaurant_product_promotion_id,
  }: UpdateUniqueRestaurantProductPromotionServiceData) {
    const foundRestaurantProduct =
      await this.restaurantProductPromotionRepository.findUniqueById(
        restaurant_product_promotion_id,
      );

    if (!foundRestaurantProduct) {
      throw new BadRequestException(
        'Restaurant product promotion does not exist.',
      );
    }

    data = mergeData(foundRestaurantProduct, data);

    const restaurantProductPromotion =
      await this.restaurantProductPromotionRepository.updateUnique({
        data,
        restaurant_product_promotion_id,
      });

    return restaurantProductPromotion;
  }
}
