import { IRestaurant } from '../entities/restaurant';

export abstract class AbstractCreateRestaurantService {
  public abstract execute(data: IRestaurant): Promise<IRestaurant>;
}

export abstract class AbstractListRestaurantsService {
  public abstract execute(): Promise<IRestaurant[]>;
}

export abstract class AbstractListUniqueRestaurantService {
  public abstract execute(restaurant_id: string): Promise<IRestaurant>;
}
