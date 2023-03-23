import { z as zod } from 'zod';
import { Controller, Post, Body, Res } from '@nestjs/common';

import { BadRequestException } from '@nestjs/common/exceptions';
import { Response } from 'express';
import { RegisterUserService } from '@root/modules/user/services/register-user.service';
import { RegisterUserServiceData } from '@root/modules/user/domain/services/types';

@Controller()
export class UserController {
  constructor(private registerUserService: RegisterUserService) {}
  @Post('/users/register')
  async registerUser(
    @Body() data: RegisterUserServiceData,
    @Res() response: Response,
  ) {
    const validator = zod.object({
      name: zod.string({ required_error: 'name is required' }),
      email: zod
        .string({ required_error: 'email is required' })
        .email('Please, enter a valid email address'),
      password: zod.string({ required_error: 'password is required' }),
      password_confirmation: zod.string({
        required_error: 'password_confirmation is required',
      }),
    });

    try {
      validator.parse(data);
    } catch (error) {
      throw new BadRequestException(error.errors);
    }

    const user = await this.registerUserService.execute(data);

    return response.status(201).json(user);
  }
}
