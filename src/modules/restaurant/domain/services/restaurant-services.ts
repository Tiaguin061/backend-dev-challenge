import { IRestaurant } from '../entities/restaurant';
import { UpdateUniqueRestaurantData } from './types';

export abstract class AbstractCreateRestaurantService {
  public abstract execute(data: IRestaurant): Promise<IRestaurant>;
}

export abstract class AbstractUpdateUniqueRestaurantService {
  public abstract execute(
    data: UpdateUniqueRestaurantData,
  ): Promise<IRestaurant>;
}

export abstract class AbstractDeleteUniqueRestaurantService {
  public abstract execute(restaurant_id: string): Promise<void>;
}

export abstract class AbstractListRestaurantsService {
  public abstract execute(): Promise<IRestaurant[]>;
}

export abstract class AbstractListUniqueRestaurantService {
  public abstract execute(restaurant_id: string): Promise<IRestaurant>;
}
