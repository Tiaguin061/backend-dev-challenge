import {
  CreateRestaurantProductServiceData,
  UpdateUniqueRestaurantProductServiceData,
} from './types';

import { IRestaurant } from '@root/modules/restaurant/domain/entities/restaurant';
import { IRestaurantProduct } from '../entities/restaurant-product';

export abstract class AbstractCreateRestaurantProductService {
  public abstract execute(
    data: CreateRestaurantProductServiceData,
  ): Promise<IRestaurantProduct>;
}

export abstract class AbstractUpdateUniqueRestaurantProductService {
  public abstract execute(
    data: UpdateUniqueRestaurantProductServiceData,
  ): Promise<IRestaurantProduct>;
}

export abstract class AbstractDeleteUniqueRestaurantProductService {
  public abstract execute(restaurant_product_id: string): Promise<void>;
}

export abstract class AbstractListProductsFromRestaurantService {
  public abstract execute(restaurant_id: string): Promise<IRestaurant>;
}

export abstract class AbstractListUniqueRestaurantProductService {
  public abstract execute(
    restaurant_product_id: string,
  ): Promise<IRestaurantProduct>;
}
