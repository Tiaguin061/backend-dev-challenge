import { z as zod } from 'zod';
import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { IRestaurant } from '../../../domain/entities/restaurant';

import { CreateRestaurantService } from '../../../services/create-restaurant.service';
import { BadRequestException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class RestaurantController {
  constructor(private createRestaurantService: CreateRestaurantService) {}
  @Post('/restaurant/create')
  @UseInterceptors(FileInterceptor('profile_photo'))
  async createRestaurant(
    @Body() data: IRestaurant,
    @UploadedFile() profile_photo: Express.Multer.File,
  ) {
    const validator = zod.object({
      name: zod.string({ required_error: 'name is required' }),
      address: zod.string({ required_error: 'address is required' }),
      opening_hour: zod.string({ required_error: 'opening_hour is required' }),
      profile_photo: zod.string().optional().nullable(),
      user_id: zod.string({ required_error: 'user_id is required' }),
    });

    const _data = {
      ...data,
      profile_photo_buffer: profile_photo ? profile_photo.buffer : null,
      profile_photo: profile_photo ? profile_photo.originalname : null,
    };

    try {
      validator.parse(_data);
    } catch (error) {
      throw new BadRequestException(error.errors);
    }

    const restaurant = await this.createRestaurantService.execute(_data);

    return restaurant;
  }
}
