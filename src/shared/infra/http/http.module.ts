import { DatabaseModule } from '../database/database.module';
import { HttpRestaurantModule } from '@root/modules/restaurant/infra/http/http.module';
import { HttpRestaurantProductModule } from '@root/modules/restaurant-products/infra/http/http.module';
import { HttpRestaurantProductPromotionModule } from '@root/modules/restaurant-product-promotion/infra/http/http.module';
import { Module } from '@nestjs/common';
import { ProviderModule } from '@root/shared/providers/provider.module';

@Module({
  imports: [
    DatabaseModule,
    ProviderModule,
    HttpRestaurantModule,
    HttpRestaurantProductPromotionModule,
    HttpRestaurantProductModule,
  ],
})
export class HttpModule {}
