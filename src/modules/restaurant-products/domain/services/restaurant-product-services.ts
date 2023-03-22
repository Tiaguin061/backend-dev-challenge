import {
  CreateRestaurantProductServiceData,
  UpdateUniqueRestaurantProductServiceData,
} from './types';

import { IRestaurantProduct } from '../entities/restaurant-product';
import { ListManyProductsFromRestaurantRepositoryData } from '../repositories/types';

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
  public abstract execute(
    restaurant_id: string,
  ): Promise<ListManyProductsFromRestaurantRepositoryData>;
}

export abstract class AbstractListUniqueRestaurantProductService {
  public abstract execute(
    restaurant_product_id: string,
  ): Promise<IRestaurantProduct>;
}
