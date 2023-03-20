import { Injectable } from '@nestjs/common';
import { RestaurantProduct } from '@prisma/client';
import { RestaurantProductRepository } from '@root/modules/restaurant-products/domain/repositories/restaurant-product-repository';
import { prisma } from '@root/shared/infra/database/prisma/client';

@Injectable()
export class PrismaRestaurantProductRepository
  implements RestaurantProductRepository
{
  async create(data: RestaurantProduct) {
    const restaurant = await prisma.restaurantProduct.create({
      data,
      include: {
        restaurantProductPromocion: true,
        productCategory: true,
        restaurant: true,
      },
    });

    return restaurant;
  }

  async deleteUniqueById(restaurant_product_id: string) {
    await prisma.restaurantProduct.delete({
      where: {
        id: restaurant_product_id,
      },
    });
  }

  async updateUnique({ data, restaurant_product_id }: any) {
    return prisma.restaurantProduct.update({
      where: {
        id: restaurant_product_id,
      },
      data,
      include: {
        restaurantProductPromocion: true,
        productCategory: true,
        restaurant: true,
      },
    });
  }

  public findUniqueById(restaurant_product_id: string) {
    return prisma.restaurantProduct.findUnique({
      where: {
        id: restaurant_product_id,
      },
      include: {
        restaurantProductPromocion: true,
        productCategory: true,
        restaurant: true,
      },
    });
  }

  public listManyFromRestaurantId(restaurant_id: string) {
    return prisma.restaurantProduct.findMany({
      where: {
        restaurant_id,
      },
      include: {
        restaurantProductPromocion: true,
        productCategory: true,
      },
    });
  }
}
