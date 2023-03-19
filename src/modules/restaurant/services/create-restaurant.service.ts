import { AbstractCreateRestaurantService } from '@root/modules/restaurant/domain/services/restaurant-services';
import { CreateRestaurantServiceData } from '@root/modules/restaurant/domain/services/types';
import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '@root/modules/restaurant/domain/repositories/restaurant-repository';
import { StorageProvider } from '@root/shared/providers/storageProvider/models/storage-provider';

@Injectable()
export class CreateRestaurantService
  implements AbstractCreateRestaurantService
{
  constructor(
    private restaurantRepository: RestaurantRepository,
    private storageProvider: StorageProvider,
  ) {}
  async execute(data: CreateRestaurantServiceData) {
    const { profile_photo_file, ..._data } = data;

    let profile_photo = null;

    if (profile_photo_file) {
      profile_photo = await this.storageProvider.saveFile({
        filename: profile_photo_file.originalname,
        buffer: profile_photo_file.buffer,
      });
    }

    const restaurant = await this.restaurantRepository.create({
      ..._data,
      profile_photo,
    });

    return restaurant;
  }
}
