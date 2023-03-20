import {
  CreateRestaurantProductPromotionRepositoryData,
  UpdateUniqueRestaurantProductPromotionRepositoryData,
} from '../repositories/types';

import { IRestaurantProductPromotion } from '../entities/restaurant-product-promotion';

export abstract class AbstractCreateRestaurantProductPromotionService {
  public abstract execute(
    data: CreateRestaurantProductPromotionRepositoryData,
  ): Promise<IRestaurantProductPromotion>;
}

export abstract class AbstractUpdateUniqueRestaurantProductPromotionService {
  public abstract execute(
    data: UpdateUniqueRestaurantProductPromotionRepositoryData,
  ): Promise<IRestaurantProductPromotion>;
}

// export abstract class AbstractDeleteUniqueRestaurantProductPromotionService {
//   public abstract execute(restaurant_product_id: string): Promise<void>;
// }

// export abstract class AbstractListRestaurantProductPromotionsService {
//   public abstract execute(): Promise<IRestaurantProductPromotion[]>;
// }

// export abstract class AbstractListUniqueRestaurantProductPromotionService {
//   public abstract execute(
//     restaurant_product_id: string,
//   ): Promise<IRestaurantProductPromotion>;
// }
