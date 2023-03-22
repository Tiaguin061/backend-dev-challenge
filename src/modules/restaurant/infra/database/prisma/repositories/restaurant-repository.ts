import { IRestaurant } from '@root/modules/restaurant/domain/entities/restaurant';
import { Injectable } from '@nestjs/common';
import { Restaurant } from '@prisma/client';
import { RestaurantRepository } from '@root/modules/restaurant/domain/repositories/restaurant-repository';
import { UpdateUniqueRestaurantRepositoryData } from '@root/modules/restaurant/domain/repositories/types';
import { prisma } from '@root/shared/infra/database/prisma/client';

@Injectable()
export class PrismaRestaurantRepository implements RestaurantRepository {
  async create(data: Restaurant) {
    const restaurant = await prisma.restaurant.create({
      data,
    });

    return restaurant;
  }

  async deleteUniqueById(restaurant_id: string) {
    await prisma.restaurant.delete({
      where: {
        id: restaurant_id,
      },
    });
  }

  async updateUnique({
    data,
    restaurant_id,
  }: UpdateUniqueRestaurantRepositoryData) {
    return prisma.restaurant.update({
      where: {
        id: restaurant_id,
      },
      data,
    });
  }

  public findUniqueById(restaurant_id: string) {
    return prisma.restaurant.findUnique({
      where: {
        id: restaurant_id,
      },
      include: {
        restaurantProduct: {
          include: {
            restaurantProductCategory: true,
            restaurantProductPromotions: true,
          },
        },
      },
    });
  }

  public async listManyProductFromRestaurantId(restaurant_id: string) {
    const data = await prisma.restaurant.findUnique({
      where: {
        id: restaurant_id,
      },
      include: {
        restaurantProductCategory: {
          include: {
            restaurantProducts: {
              include: {
                restaurantProductPromotions: true,
              },
            },
          },
        },
      },
    });

    const restaurant: IRestaurant = {
      id: data.id,
      name: data.name,
      address: data.address,
      opening_hour: data.opening_hour,
      user_id: data.user_id,
      created_at: data.created_at,
      updated_at: data.updated_at,
      profile_photo: data.profile_photo,
    };

    return {
      restaurant,
      restaurantProductsCategory: data.restaurantProductCategory,
    };
  }

  public listMany() {
    return prisma.restaurant.findMany();
  }
}
