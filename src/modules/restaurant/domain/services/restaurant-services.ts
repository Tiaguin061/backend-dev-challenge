import { IRestaurant } from '../entities/restaurant';
import { IUser } from '@root/modules/user/domain/entities/user';
import { UpdateUniqueRestaurantServiceData } from './types';

export abstract class AbstractCreateRestaurantService {
  public abstract execute(data: IRestaurant): Promise<IRestaurant>;
}

export abstract class AbstractUpdateUniqueRestaurantService {
  public abstract execute(
    data: UpdateUniqueRestaurantServiceData,
  ): Promise<IRestaurant>;
}

export abstract class AbstractDeleteUniqueRestaurantService {
  public abstract execute(restaurant_id: string): Promise<void>;
}

export abstract class AbstractListRestaurantsService {
  public abstract execute(): Promise<IRestaurant[]>;
}
export abstract class AbstractListRestaurantsFromUserService {
  public abstract execute(user_id: string): Promise<IUser | null>;
}

export abstract class AbstractListUniqueRestaurantService {
  public abstract execute(restaurant_id: string): Promise<IRestaurant>;
}
