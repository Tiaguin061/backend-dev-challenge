import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RestaurantDatabaseModule } from '@root/modules/restaurant/infra/database/database.module';
import { RestaurantProductCategoryDatabaseModule } from '@root/modules/restaurant-product-category/infra/database/database.module';
import { RestaurantProductDatabaseModule } from '@root/modules/restaurant-products/infra/database/database.module';
import { RestaurantProductPromotionDatabaseModule } from '@root/modules/restaurant-product-promotion/infra/database/database.module';

@Module({
  imports: [],
  providers: [
    PrismaService,
    RestaurantDatabaseModule,
    RestaurantProductDatabaseModule,
    RestaurantProductPromotionDatabaseModule,
    RestaurantProductCategoryDatabaseModule,
  ],
  exports: [],
})
export class DatabaseModule {}
