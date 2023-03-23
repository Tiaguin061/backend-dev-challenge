import { Injectable } from '@nestjs/common';
import { RegisterUserRepositoryData } from '@root/modules/user/domain/repositories/types';
import { UserRepository } from '@root/modules/user/domain/repositories/user-respository';
import { prisma } from '@root/shared/infra/database/prisma/client';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  async register(data: RegisterUserRepositoryData) {
    return prisma.user.create({
      data,
    });
  }

  async findUniqueById(user_id: string) {
    return prisma.user.findUnique({
      where: {
        id: user_id,
      },
      include: {
        restaurant: true,
      },
    });
  }

  async findUniqueByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        restaurant: true,
      },
    });
  }
}
