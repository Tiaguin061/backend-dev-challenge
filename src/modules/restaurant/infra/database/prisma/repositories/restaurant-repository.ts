import { Injectable } from '@nestjs/common';
import { Restaurant } from '@prisma/client';
import { RestaurantRepository } from 'src/modules/restaurant/domain/repositories/restaurant-repository';
import { prisma } from 'src/shared/infra/database/prisma/client';

@Injectable()
export class PrismaRestaurantRepository implements RestaurantRepository {
  async create(data: Restaurant) {
    const restaurant = await prisma.restaurant.create({
      data,
    });

    return restaurant;
  }
}
