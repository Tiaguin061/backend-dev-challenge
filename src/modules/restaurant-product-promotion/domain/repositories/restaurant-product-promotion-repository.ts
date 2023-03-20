import {
  CreateRestaurantProductPromotionRepositoryData,
  UpdateUniqueRestaurantProductPromotionRepositoryData,
} from './types';

import { IRestaurantProductPromotion } from '../entities/restaurant-product-promotion';

export abstract class RestaurantProductPromotionRepository {
  public abstract create(
    restaurant_product_promotion: CreateRestaurantProductPromotionRepositoryData,
  ): Promise<IRestaurantProductPromotion>;

  public abstract updateUnique(
    data: UpdateUniqueRestaurantProductPromotionRepositoryData,
  ): Promise<IRestaurantProductPromotion | null>;

  public abstract findUniqueById(
    restaurant_product_promotion_id: string,
  ): Promise<IRestaurantProductPromotion | null>;

  // public abstract deleteUniqueById(
  //   restaurant_product_promotion_id: string,
  // ): Promise<void>;

  // public abstract listManyFromRestaurantId(
  //   restaurant_product_id: string,
  // ): Promise<IRestaurantProductPromotion[]>;
}
