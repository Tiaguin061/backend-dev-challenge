import { CreateRestaurantProductCategoryRepositoryData } from '@root/modules/restaurant-product-category/domain/repositories/types';
import { Injectable } from '@nestjs/common';
import { RestaurantProductCategoryRepository } from '@root/modules/restaurant-product-category/domain/repositories/restaurant-product-category-repository';
import { prisma } from '@root/shared/infra/database/prisma/client';

@Injectable()
export class PrismaRestaurantProductCategoryRepository
  implements RestaurantProductCategoryRepository
{
  async create(data: CreateRestaurantProductCategoryRepositoryData) {
    return prisma.restaurantProductCategory.create({
      data,
    });
  }

  async findUniqueById(restaurant_product_category: string) {
    return prisma.restaurantProductCategory.findUnique({
      where: {
        id: restaurant_product_category,
      },
      include: {
        restaurant: true,
      },
    });
  }
}
