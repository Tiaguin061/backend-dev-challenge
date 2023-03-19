import { EntityCommons } from '@root/shared/types/common-entities';
import { IRestaurantProduct } from '@root/modules/restaurant-products/domain/entities/restaurant-product';
import { randomUUID } from 'node:crypto';

export type RestaurantCommons = Partial<EntityCommons>;

export interface IRestaurantProps {
  name: string;
  address: string;
  opening_hour: string;
  profile_photo?: string | null;
  user_id: string;

  profile_photo_file?: CustomFile.File;

  restaurantProduct?: IRestaurantProduct[];
}

export interface IRestaurant extends IRestaurantProps, RestaurantCommons {}

export class Restaurant implements IRestaurant {
  private _id: string;

  private _props: IRestaurant;

  get restaurant(): IRestaurant {
    return {
      id: this._id,
      name: this._props.name,
      address: this._props.address,
      opening_hour: this._props.opening_hour,
      profile_photo: this._props.profile_photo,
      user_id: this._props.user_id,
    };
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._props.name;
  }

  get address(): string {
    return this._props.address;
  }

  get opening_hour(): string {
    return this._props.opening_hour;
  }

  get profile_photo(): string {
    return this._props.profile_photo;
  }

  get user_id(): string {
    return this._props.user_id;
  }

  get restaurantProduct(): IRestaurantProduct[] {
    return this._props.restaurantProduct;
  }

  constructor(props: IRestaurantProps, commons?: RestaurantCommons) {
    this._id = commons?.id || randomUUID();

    this._props = {
      ...props,
      created_at: commons?.created_at || new Date(),
      updated_at: commons?.updated_at || new Date(),
    };
  }
}
