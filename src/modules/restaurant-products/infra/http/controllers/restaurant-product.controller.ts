import { z as zod } from 'zod';
import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { IRestaurantProduct } from '../../../domain/entities/restaurant-product';

import { CreateRestaurantProductService } from '../../../services/create-restaurant-product.service';
import { BadRequestException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller()
export class RestaurantProductController {
  constructor(
    private createRestaurantProductService: CreateRestaurantProductService,
  ) {}
  @Post('/restaurants/products/create')
  @UseInterceptors(FileInterceptor('profile_photo'))
  async createRestaurant(
    @Body() data: IRestaurantProduct,
    @UploadedFile() profile_photo_file: Express.Multer.File,
    @Res() response: Response,
  ) {
    const validator = zod.object({
      name: zod.string({ required_error: 'name is required' }),
      address: zod.string({ required_error: 'address is required' }),
      opening_hour: zod.string({ required_error: 'opening_hour is required' }),
      profile_photo: zod.object({}).optional().nullable(),
      user_id: zod.string({ required_error: 'user_id is required' }),
    });

    try {
      validator.parse({
        ...data,
        profile_photo_file,
      });
    } catch (error) {
      throw new BadRequestException(error.errors);
    }

    const restaurantProduct = await this.createRestaurantProductService.execute(
      {
        restaurant_product: {
          ...data,
          profile_photo_file,
        },
      },
    );

    return response.status(201).json(restaurantProduct);
  }
}
