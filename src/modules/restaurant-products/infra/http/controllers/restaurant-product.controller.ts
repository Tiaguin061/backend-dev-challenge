import { z as zod } from 'zod';
import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Res,
  Get,
  Delete,
  Put,
  Query,
} from '@nestjs/common';

import { CreateRestaurantProductService } from '../../../services/create-restaurant-product.service';
import { BadRequestException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import {
  CreateRestaurantProductServiceData,
  UpdateUniqueRestaurantProductServiceData,
} from '@root/modules/restaurant-products/domain/services/types';
import { ListProductsFromRestaurantService } from '@root/modules/restaurant-products/services/list-products-from-restaurant.service';
import { ListUniqueRestaurantProductService } from '@root/modules/restaurant-products/services/list-unique-restaurant-product.service';
import { DeleteUniqueRestaurantProductService } from '@root/modules/restaurant-products/services/delete-unique-restaurant-product.service';
import { UpdateUniqueRestaurantProductService } from '@root/modules/restaurant-products/services/update-unique-restaurant-product.service';

@Controller()
export class RestaurantProductController {
  constructor(
    private createRestaurantProductService: CreateRestaurantProductService,
    private listProductsFromRestaurantService: ListProductsFromRestaurantService,
    private listUniqueRestaurantProductService: ListUniqueRestaurantProductService,
    private deleteUniqueRestaurantProductService: DeleteUniqueRestaurantProductService,
    private updateUniqueRestaurantProductService: UpdateUniqueRestaurantProductService,
  ) {}
  @Post('/restaurants/products/create')
  @UseInterceptors(FileInterceptor('restaurant_product[profile_photo]'))
  async createRestaurantProduct(
    @Body() data: CreateRestaurantProductServiceData,
    @UploadedFile() profile_photo: Express.Multer.File,
    @Res() response: Response,
  ) {
    const validator = zod.object({
      restaurant_product: zod.object({
        name: zod.string({ required_error: 'name is required' }),
        price: zod.number({ required_error: 'price is required' }),
        product_category_id: zod.string({
          required_error: 'product_category_id is required',
        }),
        profile_photo: zod.object({}).optional().nullable(),
        restaurant_id: zod.string({
          required_error: 'restaurant_id is required',
        }),
      }),
      restaurant_product_promotion: zod
        .object({
          description: zod.string({
            required_error: 'description is required',
          }),
          promotional_price: zod.number({
            required_error: 'promotional_price is required',
          }),
          start_promotion_date: zod.date({
            required_error: 'start_promotion_date is required',
          }),
          end_promotion_date: zod.date({
            required_error: 'end_promotion_date is required',
          }),
        })
        .optional(),
    });

    const _data = {
      restaurant_product_promotion: data?.restaurant_product_promotion && {
        ...data.restaurant_product_promotion,
        promotional_price: Number(
          data.restaurant_product_promotion.promotional_price,
        ),
        start_promotion_date: new Date(
          data.restaurant_product_promotion.start_promotion_date,
        ),
        end_promotion_date: new Date(
          data.restaurant_product_promotion.end_promotion_date,
        ),
      },

      restaurant_product: {
        ...data.restaurant_product,
        price: Number(data.restaurant_product.price),
        profile_photo_file: profile_photo,
      },
    };

    try {
      validator.parse(_data);
    } catch (error) {
      throw new BadRequestException(error.errors);
    }

    const restaurantProduct = await this.createRestaurantProductService.execute(
      _data,
    );

    return response.status(201).json(restaurantProduct);
  }

  @Get('/restaurants/products/list-many')
  async listProductsFromRestaurant(
    @Query()
    query: { restaurant_id: string },
    @Res() response: Response,
  ) {
    const validator = zod.string({
      required_error: 'restaurant_id params is required',
    });

    try {
      validator.parse(query.restaurant_id);
    } catch (error) {
      throw new BadRequestException(error.errors);
    }

    const restaurantProduct =
      await this.listProductsFromRestaurantService.execute(query.restaurant_id);

    return response.status(200).json(restaurantProduct);
  }

  @Get('/restaurants/products/list-unique')
  async listUniqueRestaurantProduct(
    @Query()
    query: { restaurant_product_id: string },
    @Res() response: Response,
  ) {
    const validator = zod.string({
      required_error: 'restaurant_product_id params is required',
    });

    try {
      validator.parse(query.restaurant_product_id);
    } catch (error) {
      throw new BadRequestException(error.errors);
    }

    const restaurantProduct =
      await this.listUniqueRestaurantProductService.execute(
        query.restaurant_product_id,
      );

    return response.status(200).json(restaurantProduct);
  }

  @Delete('/restaurants/products/delete-unique')
  async deleteUniqueRestaurantProduct(
    @Query()
    query: { restaurant_product_id: string },
    @Res() response: Response,
  ) {
    const validator = zod.string({
      required_error: 'restaurant_product_id params is required',
    });

    try {
      validator.parse(query.restaurant_product_id);
    } catch (error) {
      throw new BadRequestException(error.errors);
    }

    const restaurantProduct =
      await this.deleteUniqueRestaurantProductService.execute(
        query.restaurant_product_id,
      );

    return response.status(200).json(restaurantProduct);
  }

  @Put('/restaurants/products/update-unique')
  @UseInterceptors(FileInterceptor('data[restaurant_product][profile_photo]'))
  async updateUniqueRestaurantProduct(
    @Body() { data }: UpdateUniqueRestaurantProductServiceData,
    @Query()
    query: { restaurant_product_id: string },
    @UploadedFile() profile_photo: Express.Multer.File,
    @Res() response: Response,
  ) {
    const validator = zod.object({
      restaurant_product_id: zod.string({
        required_error: 'restaurant_product_id is required',
      }),
      restaurant_product: zod.object({
        name: zod.string({ required_error: 'name is required' }),
        price: zod.number({ required_error: 'price is required' }),
        product_category_id: zod.string({
          required_error: 'product_category_id is required',
        }),
        profile_photo: zod.object({}).optional().nullable(),
      }),
      restaurant_product_promotion: zod
        .object({
          id: zod.string({
            required_error: 'restaurant_product_promotion id is required',
          }),
          description: zod.string({
            required_error: 'description is required',
          }),
          promotional_price: zod.number({
            required_error: 'promotional_price is required',
          }),
          start_promotion_date: zod.date({
            required_error: 'start_promotion_date is required',
          }),
          end_promotion_date: zod.date({
            required_error: 'end_promotion_date is required',
          }),
        })
        .optional(),
    });

    const _data = {
      restaurant_product_promotion: data?.restaurant_product_promotion && {
        ...data.restaurant_product_promotion,
        promotional_price: Number(
          data.restaurant_product_promotion.promotional_price,
        ),
        start_promotion_date: new Date(
          data.restaurant_product_promotion.start_promotion_date,
        ),
        end_promotion_date: new Date(
          data.restaurant_product_promotion.end_promotion_date,
        ),
      },

      restaurant_product: {
        ...data.restaurant_product,
        price: Number(data.restaurant_product.price),
        profile_photo_file: profile_photo,
      },
    };

    try {
      validator.parse({
        restaurant_product_id: query.restaurant_product_id,
        ..._data,
      });
    } catch (error) {
      throw new BadRequestException(error.errors);
    }

    const restaurantProduct =
      await this.updateUniqueRestaurantProductService.execute({
        data: _data,
        restaurant_product_id: query.restaurant_product_id,
      });

    return response.status(201).json(restaurantProduct);
  }
}
