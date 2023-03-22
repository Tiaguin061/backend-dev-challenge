import { EntityCommons } from '@root/shared/types/common-entities';
import { IRestaurantProduct } from '@root/modules/restaurant-products/domain/entities/restaurant-product';
import { randomUUID } from 'node:crypto';

type RestaurantProductCategoryCommons = Partial<EntityCommons>;

export interface IRestaurantProductCategoryProps {
  name: string;
  restaurant_id: string;

  restaurantProducts?: IRestaurantProduct[];
}

export interface IRestaurantProductCategory
  extends IRestaurantProductCategoryProps,
    RestaurantProductCategoryCommons {}

export class RestaurantProductCategory implements IRestaurantProductCategory {
  private _id: string;

  private _props:
    | IRestaurantProductCategory
    | Partial<IRestaurantProductCategory>;

  get restaurantProductCategory(): IRestaurantProductCategory {
    return {
      id: this._id,
      restaurant_id: this._props.restaurant_id,
      name: this._props.name,
    };
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._props.name;
  }

  get restaurant_id(): string {
    return this._props.restaurant_id;
  }

  get restaurantProducts(): IRestaurantProduct[] {
    return this._props.restaurantProducts;
  }

  constructor(
    props: IRestaurantProductCategory | Partial<IRestaurantProductCategory>,
    commons?: RestaurantProductCategoryCommons,
  ) {
    this._id = commons?.id || randomUUID();

    this._props = {
      ...props,
      created_at: commons?.created_at || new Date(),
      updated_at: commons?.updated_at || new Date(),
    };
  }
}
