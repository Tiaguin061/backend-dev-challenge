import { z as zod } from 'zod';
import { Controller, Post, Body, Res } from '@nestjs/common';

import { BadRequestException } from '@nestjs/common/exceptions';
import { Response } from 'express';
import { CreateRestaurantProductCategoryServiceData } from '@root/modules/restaurant-product-category/domain/services/types';
import { CreateRestaurantProductCategoryService } from '@root/modules/restaurant-product-category/services/create-restaurant-product-category.service';

@Controller()
export class RestaurantProductCategoryController {
  constructor(
    private createRestaurantProductCategoryService: CreateRestaurantProductCategoryService,
  ) {}
  @Post('/restaurants/products/category/create')
  async createRestaurantProductCategory(
    @Body() data: CreateRestaurantProductCategoryServiceData,
    @Res() response: Response,
  ) {
    const validator = zod.object({
      name: zod.string({ required_error: 'name is required' }),
      restaurant_id: zod.string({
        required_error: 'restaurant_id is required',
      }),
    });

    try {
      validator.parse(data);
    } catch (error) {
      throw new BadRequestException(error.errors);
    }

    const restaurantProductCategory =
      await this.createRestaurantProductCategoryService.execute(data);

    return response.status(201).json(restaurantProductCategory);
  }
}
