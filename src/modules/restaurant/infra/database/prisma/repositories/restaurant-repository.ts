import { Injectable } from '@nestjs/common';
import { Restaurant } from '@prisma/client';
import { RestaurantRepository } from '@root/modules/restaurant/domain/repositories/restaurant-repository';
import { UpdateUniqueRestaurantData } from '@root/modules/restaurant/domain/services/types';
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

  async updateUnique({ data, restaurant_id }: UpdateUniqueRestaurantData) {
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
    });
  }

  public listMany() {
    return prisma.restaurant.findMany();
  }
}
