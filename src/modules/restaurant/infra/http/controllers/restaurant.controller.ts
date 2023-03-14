import { z as zod } from 'zod';
import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Res,
  Get,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { IRestaurant } from '../../../domain/entities/restaurant';

import { CreateRestaurantService } from '../../../services/create-restaurant.service';
import { BadRequestException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { ListUniqueRestaurantService } from 'src/modules/restaurant/services/list-unique-restaurant.service';
import { Response } from 'express';
import { ListRestaurantsService } from 'src/modules/restaurant/services/list-restaurants.service';
import { UpdateUniqueRestaurantService } from 'src/modules/restaurant/services/update-unique-restaurant.service';
import { DeleteUniqueRestaurantService } from 'src/modules/restaurant/services/delete-unique-restaurant.service';

@Controller()
export class RestaurantController {
  constructor(
    private createRestaurantService: CreateRestaurantService,
    private updateUniqueRestaurantService: UpdateUniqueRestaurantService,
    private deleteUniqueRestaurantService: DeleteUniqueRestaurantService,
    private listUniqueRestaurantService: ListUniqueRestaurantService,
    private listRestaurantsService: ListRestaurantsService,
  ) {}
  @Post('/restaurants/create')
  @UseInterceptors(FileInterceptor('profile_photo'))
  async createRestaurant(
    @Body() data: IRestaurant,
    @UploadedFile() profile_photo: Express.Multer.File,
    @Res() response: Response,
  ) {
    const validator = zod.object({
      name: zod.string({ required_error: 'name is required' }),
      address: zod.string({ required_error: 'address is required' }),
      opening_hour: zod.string({ required_error: 'opening_hour is required' }),
      profile_photo: zod.string().optional().nullable(),
      user_id: zod.string({ required_error: 'user_id is required' }),
    });

    try {
      validator.parse({
        ...data,
        profile_photo,
      });
    } catch (error) {
      throw new BadRequestException(error.errors);
    }

    const restaurant = await this.createRestaurantService.execute({
      ...data,
      profile_photo_file: profile_photo,
    });

    return response.status(201).json(restaurant);
  }

  @Put('/restaurants/update-unique')
  @UseInterceptors(FileInterceptor('profile_photo'))
  async updateUniqueRestaurant(
    @Body() { restaurant_id, ...data }: IRestaurant & { restaurant_id: string },
    @UploadedFile() profile_photo: Express.Multer.File,
    @Res() response: Response,
  ) {
    const validator = zod.object({
      restaurant_id: zod.string({
        required_error: 'restaurant_id is required',
      }),
      name: zod.string({ required_error: 'name is required' }),
      address: zod.string({ required_error: 'address is required' }),
      opening_hour: zod.string({ required_error: 'opening_hour is required' }),
      profile_photo: zod.string().optional().nullable(),
      user_id: zod.string({ required_error: 'user_id is required' }),
    });

    try {
      validator.parse({
        ...data,
        restaurant_id,
      });
    } catch (error) {
      throw new BadRequestException(error.errors);
    }

    const restaurant = await this.updateUniqueRestaurantService.execute({
      data: {
        ...data,
        profile_photo_file: profile_photo,
      },
      restaurant_id,
    });

    return response.status(201).json(restaurant);
  }

  @Delete('/restaurants/delete-unique')
  async deleteUniqueRestaurant(
    @Query() queryParams: { restaurant_id: string },
    @Res() response: Response,
  ) {
    const { restaurant_id } = queryParams;

    const validator = zod.object({
      restaurant_id: zod.string({
        required_error: 'restaurant_id params is required',
      }),
    });

    try {
      validator.parse(queryParams);
    } catch (error) {
      throw new BadRequestException(error.errors);
    }

    await this.deleteUniqueRestaurantService.execute(restaurant_id);

    return response.status(204).json({
      success: 'Restaurant deleted successfully.',
    });
  }

  @Get('/restaurants/list-unique')
  async listUniqueRestaurant(
    @Query() queryParams: { restaurant_id: string },
    @Res() response: Response,
  ) {
    const { restaurant_id } = queryParams;

    const validator = zod.object({
      restaurant_id: zod.string({
        required_error: 'restaurant_id params is required',
      }),
    });

    try {
      validator.parse(queryParams);
    } catch (error) {
      throw new BadRequestException(error.errors);
    }

    const restaurant = await this.listUniqueRestaurantService.execute(
      restaurant_id,
    );

    return response.status(200).json(restaurant);
  }

  @Get('/restaurants/list-many')
  async listManyRestaurant(@Res() response: Response) {
    const restaurants = await this.listRestaurantsService.execute();

    return response.status(200).json(restaurants);
  }
}
