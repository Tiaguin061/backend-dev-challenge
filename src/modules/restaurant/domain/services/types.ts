import { IRestaurant } from '../entities/restaurant';

export interface UpdateUniqueRestaurantData {
  restaurant_id: string;
  data: IRestaurant;
}
