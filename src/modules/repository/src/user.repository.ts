import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRecord, UserToCreate, UserToUpdate } from './types';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(): Promise<UserRecord[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(userId: string): Promise<UserRecord | null> {
    return this.prisma.user.findUnique({ where: { userId } });
  }

  async getUserByEmail(emailAddress: string): Promise<UserRecord | null> {
    return this.prisma.user.findUnique({ where: { emailAddress } });
  }

  async createUser(user: UserToCreate): Promise<UserRecord> {
    return this.prisma.user.create({
      data: {
        ...user,
        updatedBy: user.createdBy,
      },
    });
  }

  async updateUserFavorites(
    userId: string,
    newFavs: string[],
  ): Promise<UserRecord> {
    return this.prisma.user.update({
      where: { userId },
      data: { favorites: newFavs },
    });
  }

  async updateUser(
    userId: string,
    attributesToUpdate: UserToUpdate,
  ): Promise<UserRecord> {
    return this.prisma.user.update({
      where: { userId },
      data: attributesToUpdate,
    });
  }

  /**
   * Soft Delete
   * @param userId
   * @param deletedBy
   */
  async deleteUser(userId: string, deletedBy: string): Promise<void> {
    await this.prisma.user.update({
      where: { userId },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy,
        isEnabled: false,
      },
    });
    return;
  }
}
