import { BadRequestException, Injectable } from '@nestjs/common';

import { AbstractUpdateUniqueRestaurantProductService } from '../domain/services/restaurant-product-services';
import { RestaurantProductPromotionRepository } from '@root/modules/restaurant-product-promotion/domain/repositories/restaurant-product-promotion-repository';
import { RestaurantProductRepository } from '../domain/repositories/restaurant-product-repository';
import { StorageProvider } from '../../../shared/providers/storageProvider/models/storage-provider';
import { UpdateUniqueRestaurantProductServiceData } from '../domain/services/types';
import { mergeData } from '@root/shared/utils/mergeData';

@Injectable()
export class UpdateUniqueRestaurantProductService
  implements AbstractUpdateUniqueRestaurantProductService
{
  constructor(
    private restaurantProductRepository: RestaurantProductRepository,
    private storageProvider: StorageProvider,
    private restaurantProductPromotionRepository: RestaurantProductPromotionRepository,
  ) {}
  async execute({
    data,
    restaurant_product_id,
  }: UpdateUniqueRestaurantProductServiceData) {
    let { restaurant_product } = data;
    let { restaurant_product_promotion } = data;

    const foundRestaurantProduct =
      await this.restaurantProductRepository.findUniqueById(
        restaurant_product_id,
      );

    if (!foundRestaurantProduct) {
      throw new BadRequestException('Restaurant product does not exist');
    }

    let profile_photo: string | null = foundRestaurantProduct.profile_photo;

    if (profile_photo && restaurant_product?.profile_photo_file) {
      profile_photo = await this.storageProvider.updateFile({
        newFilename: restaurant_product?.profile_photo_file.originalname,
        oldFilename: profile_photo,
        newFilenameBuffer: restaurant_product?.profile_photo_file.buffer,
      });
    }

    if (!profile_photo && restaurant_product?.profile_photo_file) {
      profile_photo = await this.storageProvider.saveFile({
        buffer: restaurant_product?.profile_photo_file.buffer,
        filename: restaurant_product?.profile_photo_file.originalname,
      });
    }

    restaurant_product = mergeData(
      {
        ...foundRestaurantProduct,
        profile_photo,
      },
      restaurant_product,
    );

    const restaurantProductUpdated =
      await this.restaurantProductRepository.updateUnique({
        data: {
          ...restaurant_product,
          profile_photo,
        },
        restaurant_product_id,
      });

    if (restaurant_product_promotion) {
      const foundRestaurantProductPromotion =
        await this.restaurantProductPromotionRepository.findUniqueById(
          restaurant_product_promotion.id,
        );

      if (!foundRestaurantProductPromotion) {
        throw new BadRequestException(
          'Restaurant product promotion does not exist',
        );
      }

      restaurant_product_promotion = mergeData(
        foundRestaurantProductPromotion,
        restaurant_product_promotion,
      );

      const restaurantProductPromotionUpdated =
        await this.restaurantProductPromotionRepository.updateUnique({
          data: restaurant_product_promotion,
          restaurant_product_promotion_id: foundRestaurantProductPromotion.id,
        });

      restaurantProductUpdated.restaurantProductPromotions = [
        restaurantProductPromotionUpdated,
        ...restaurantProductUpdated.restaurantProductPromotions,
      ];
    }

    return restaurantProductUpdated;
  }
}
