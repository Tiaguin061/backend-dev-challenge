import { Module } from '@nestjs/common';
import { PrismaRestaurantRepository } from 'src/modules/restaurant/infra/database/prisma/repositories/restaurant-repository';
import { PrismaService } from './prisma/prisma.service';
import { RestaurantRepository } from 'src/modules/restaurant/domain/repositories/restaurant-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: RestaurantRepository,
      useClass: PrismaRestaurantRepository,
    },
  ],
  exports: [RestaurantRepository],
})
export class DatabaseModule {}
