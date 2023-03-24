import { EntityCommons } from '@root/shared/types/common-entities';
import { IRestaurant } from '@root/modules/restaurant/domain/entities/restaurant';
import { randomUUID } from 'node:crypto';

type UserCommons = Partial<EntityCommons>;

export interface IUserProps {
  name: string;
  email: string;
  password: string;

  restaurants?: IRestaurant[];
}

export interface IUser extends IUserProps, UserCommons {}

export class User implements IUser {
  private _id: string;

  private _props: IUser | Partial<IUser>;

  get user(): IUser {
    return {
      id: this._id,
      email: this._props.email,
      name: this._props.name,
      password: this._props.password,
    };
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._props.name;
  }

  get email(): string {
    return this._props.email;
  }

  get password(): string {
    return this._props.password;
  }

  get restaurants(): IRestaurant[] {
    return this._props.restaurants;
  }

  constructor(props: IUser | Partial<IUser>, commons?: UserCommons) {
    this._id = commons?.id || randomUUID();

    this._props = {
      ...props,
      created_at: commons?.created_at || new Date(),
      updated_at: commons?.updated_at || new Date(),
    };
  }
}
