import { EntityCommons } from '@root/shared/types/common-entities';
import { randomUUID } from 'node:crypto';

type RestaurantProductPromotionCommons = Partial<EntityCommons>;

export interface IRestaurantProductPromotionProps {
  description: string;
  promotional_price: number;
  start_promotion_date: Date;
  end_promotion_date?: Date;
  restaurant_product_id: string;
}

export interface IRestaurantProductPromotion
  extends IRestaurantProductPromotionProps,
    RestaurantProductPromotionCommons {}

export class RestaurantProductPromotion implements IRestaurantProductPromotion {
  private _id: string;

  private _props:
    | IRestaurantProductPromotion
    | Partial<IRestaurantProductPromotion>;

  get restaurantProductPromotion(): IRestaurantProductPromotion {
    return {
      id: this._id,
      description: this._props.description,
      promotional_price: this._props.promotional_price,
      start_promotion_date: this._props.start_promotion_date,
      end_promotion_date: this._props.end_promotion_date,
      restaurant_product_id: this._props.restaurant_product_id,
    };
  }

  get id(): string {
    return this._id;
  }

  get description(): string {
    return this._props.description;
  }

  get promotional_price(): number {
    return this._props.promotional_price;
  }

  get start_promotion_date(): Date {
    return this._props.start_promotion_date;
  }

  get end_promotion_date(): Date {
    return this._props.end_promotion_date;
  }

  get restaurant_product_id(): string {
    return this._props.restaurant_product_id;
  }

  constructor(
    props: IRestaurantProductPromotion | Partial<IRestaurantProductPromotion>,
    commons?: RestaurantProductPromotionCommons,
  ) {
    this._id = commons?.id || randomUUID();

    this._props = {
      ...props,
      created_at: commons?.created_at || new Date(),
      updated_at: commons?.updated_at || new Date(),
    };
  }
}
