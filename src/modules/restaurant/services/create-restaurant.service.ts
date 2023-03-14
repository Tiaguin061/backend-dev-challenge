import { AbstractCreateRestaurantService } from '../domain/services/restaurant-services';
import { IRestaurant } from '../domain/entities/restaurant';
import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '../domain/repositories/restaurant-repository';
import { StorageProvider } from '../../../shared/providers/storageProvider/models/storage-provider';

@Injectable()
export class CreateRestaurantService
  implements AbstractCreateRestaurantService
{
  constructor(
    private restaurantRepository: RestaurantRepository,
    private storageProvider: StorageProvider,
  ) {}
  async execute(data: IRestaurant) {
    const { profile_photo_file, ..._data } = data;

    if (profile_photo_file) {
      _data.profile_photo = await this.storageProvider.saveFile({
        filename: profile_photo_file.originalname,
        buffer: profile_photo_file.buffer,
      });
    }

    const restaurant = await this.restaurantRepository.create(_data);

    return restaurant;
  }
}
