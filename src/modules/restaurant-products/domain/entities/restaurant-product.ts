import { EntityCommons } from '@root/shared/types/common-entities';
import { IRestaurant } from '@root/modules/restaurant/domain/entities/restaurant';
import { IRestaurantProductPromotion } from '@root/modules/restaurant-product-promotion/domain/entities/restaurant-product-promotion';
import { randomUUID } from 'node:crypto';

export type RestaurantProductCommons = Partial<EntityCommons>;

export interface IRestaurantProductProps {
  name: string;
  price: number;
  profile_photo?: string | null;
  product_category_id: string;
  restaurant_id: string;

  profile_photo_file?: CustomFile.File;

  restaurantProductPromotions?: IRestaurantProductPromotion[];
  restaurant?: IRestaurant;
}

export interface IRestaurantProduct
  extends IRestaurantProductProps,
    RestaurantProductCommons {}

export class RestaurantProduct implements IRestaurantProduct {
  private _id: string;

  private _props: IRestaurantProduct;

  get restaurantProduct(): IRestaurantProduct {
    return {
      id: this._id,
      name: this._props.name,
      price: this._props.price,
      profile_photo: this._props.profile_photo,
      product_category_id: this._props.product_category_id,
      restaurant_id: this._props.restaurant_id,
    };
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._props.name;
  }

  get price(): number {
    return this._props.price;
  }

  get profile_photo(): string {
    return this._props.profile_photo;
  }

  get product_category_id(): string {
    return this._props.product_category_id;
  }

  get restaurant_id(): string {
    return this._props.restaurant_id;
  }

  get restaurantProductPromotions(): IRestaurantProductPromotion[] {
    return this._props.restaurantProductPromotions;
  }

  get restaurant(): IRestaurant {
    return this._props.restaurant;
  }

  constructor(
    props: IRestaurantProductProps,
    commons?: RestaurantProductCommons,
  ) {
    this._id = commons?.id || randomUUID();

    this._props = {
      ...props,
      created_at: commons?.created_at || new Date(),
      updated_at: commons?.updated_at || new Date(),
    };
  }
}
