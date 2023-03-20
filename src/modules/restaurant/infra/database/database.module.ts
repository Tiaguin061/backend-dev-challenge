import { Module } from '@nestjs/common';
import { PrismaRestaurantRepository } from '@root/modules/restaurant/infra/database/prisma/repositories/restaurant-repository';
import { RestaurantRepository } from '@root/modules/restaurant/domain/repositories/restaurant-repository';

@Module({
  providers: [
    {
      provide: RestaurantRepository,
      useClass: PrismaRestaurantRepository,
    },
  ],
  exports: [RestaurantRepository],
})
export class RestaurantDatabaseModule {}
