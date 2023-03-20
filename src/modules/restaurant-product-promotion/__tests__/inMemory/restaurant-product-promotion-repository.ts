import {
  CreateRestaurantProductPromotionRepositoryData,
  UpdateUniqueRestaurantProductPromotionRepositoryData,
} from '@root/modules/restaurant-product-promotion/domain/repositories/types';
import {
  IRestaurantProductPromotion,
  RestaurantProductPromotion,
} from '@root/modules/restaurant-product-promotion/domain/entities/restaurant-product-promotion';

import { RestaurantProductPromotionRepository } from '@root/modules/restaurant-product-promotion/domain/repositories/restaurant-product-promotion-repository';
import { mergeData } from '@root/shared/utils/mergeData';

export class InMemoryRestaurantProductPromotionRepository
  implements RestaurantProductPromotionRepository
{
  private restaurantProductPromotions: IRestaurantProductPromotion[] = [];

  async create(
    data: CreateRestaurantProductPromotionRepositoryData,
  ): Promise<IRestaurantProductPromotion> {
    const restaurantProductPromotion = new RestaurantProductPromotion(data)
      .restaurantProductPromotion;

    this.restaurantProductPromotions.push(restaurantProductPromotion);

    return restaurantProductPromotion;
  }

  async updateUnique({
    data,
    restaurant_product_promotion_id,
  }: UpdateUniqueRestaurantProductPromotionRepositoryData): Promise<IRestaurantProductPromotion | null> {
    const foundRestaurantProductPromotion =
      this.restaurantProductPromotions.find(
        (where) => where.id === restaurant_product_promotion_id,
      );

    if (!foundRestaurantProductPromotion) {
      return null;
    }

    const _data = mergeData(foundRestaurantProductPromotion, data);

    const restaurantProductPromotionUpdated = new RestaurantProductPromotion(
      _data,
    ).restaurantProductPromotion;

    this.restaurantProductPromotions.push(restaurantProductPromotionUpdated);

    return restaurantProductPromotionUpdated;
  }

  async findUniqueById(
    restaurant_product_promotion_id: string,
  ): Promise<IRestaurantProductPromotion | null> {
    return this.restaurantProductPromotions.find(
      (where) => where.id === restaurant_product_promotion_id,
    );
  }

  // async deleteUniqueById(restaurant_product_id: string): Promise<void> {
  //   const foundRestaurantProductPromotion = this.restaurantProductPromotions.find(
  //     (where) => where.id === restaurant_product_id,
  //   );

  //   if (!foundRestaurantProductPromotion) {
  //     return null;
  //   }

  //   this.restaurantProductPromotions.filter(
  //     (where) => where.id !== restaurant_product_id,
  //   );

  //   return;
  // }
}
