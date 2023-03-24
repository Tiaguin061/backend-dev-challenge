import { BadRequestException, Injectable } from '@nestjs/common';

import { AbstractCreateRestaurantService } from '@root/modules/restaurant/domain/services/restaurant-services';
import { CreateRestaurantServiceData } from '@root/modules/restaurant/domain/services/types';
import { RestaurantRepository } from '@root/modules/restaurant/domain/repositories/restaurant-repository';
import { StorageProvider } from '@root/shared/providers/storageProvider/models/storage-provider';
import { UserRepository } from '@root/modules/user/domain/repositories/user-respository';

@Injectable()
export class CreateRestaurantService
  implements AbstractCreateRestaurantService
{
  constructor(
    private restaurantRepository: RestaurantRepository,
    private storageProvider: StorageProvider,
    private userRepository: UserRepository,
  ) {}
  async execute(data: CreateRestaurantServiceData) {
    const { profile_photo_file, ..._data } = data;

    const foundUser = await this.userRepository.findUniqueById(_data.user_id);

    if (!foundUser) {
      throw new BadRequestException('This user does not exist.');
    }

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
