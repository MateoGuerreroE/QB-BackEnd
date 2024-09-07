import { Injectable } from '@nestjs/common';
import { UserRecord, UserToCreate, UserToUpdate } from 'src/modules/repository';
import { UserRepository } from 'src/modules/repository';
import { UserCreateInput } from 'src/modules/repository';
import { UserUpdateInput } from 'src/modules/repository';
import {
  ApplicationError,
  isValidHexId,
  UnauthorizedError,
} from 'src/modules/utils';
import { NotFoundError } from 'src/modules/utils';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserList(): Promise<UserRecord[]> {
    return this.userRepository.getAllUsers();
  }

  async getUser(userId: string): Promise<UserRecord> {
    const result = await this.userRepository.getUserById(userId);
    isValidHexId(userId, 'userId');
    if (!result) {
      throw new NotFoundError('User', userId);
    }
    return result;
  }

  async getUserByEmail(userEmail: string): Promise<UserRecord> {
    const result = await this.userRepository.getUserByEmail(userEmail);
    if (!result) {
      throw new NotFoundError('User', userEmail);
    }
    return result;
  }

  /**
   * @ignore Not in use -
   * Reference method, not currently used
   * as user creation is done through register.
   * This may be used in the future If user can be created
   * in any other way.
   */
  async createUser(
    userInfo: UserCreateInput,
    creatorId: string,
  ): Promise<UserRecord> {
    const userToCreate: UserToCreate = {
      ...userInfo,
      createdBy: creatorId,
    };
    try {
      await this.verifyUserExistence('', null, userToCreate.emailAddress);
      throw new ApplicationError('Email is in use', 409); // Throw error If user found
    } catch (error: any) {}
    await this.verifyUserExistence('creator', creatorId);
    try {
      const result = await this.userRepository.createUser(userToCreate);
      return result;
    } catch (error: any) {
      throw new ApplicationError(error.message);
    }
  }

  async updateUser(
    userInfo: UserUpdateInput,
    updaterId: string,
  ): Promise<UserRecord> {
    isValidHexId(userInfo.userId, 'user to update');
    const { userId, ...updates } = userInfo;
    const userToUpdate: UserToUpdate = {
      ...updates,
      updatedBy: updaterId,
    };
    // Ensure user exists
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundError('User to Update', userId);
    }
    await this.verifyUserExistence('updater', updaterId);
    try {
      const result = await this.userRepository.updateUser(
        user.userId,
        userToUpdate,
      );
      return result;
    } catch (error) {
      throw new ApplicationError(error.message);
    }
  }

  async deleteUser(userId: string, deletorId: string): Promise<void> {
    isValidHexId(userId, 'user to delete');
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new NotFoundError('User to Delete', userId);
    }
    const isDeletorValid = this.verifyUserExistence(deletorId);
    if (!isDeletorValid) {
      throw new ApplicationError('Invalid deletor', 400);
    }
    try {
      await this.userRepository.deleteUser(userId, deletorId);
    } catch (error: any) {
      throw new ApplicationError(error.message);
    }
  }

  /**
   * Util private method to validate If user exists and is Enabled,
   * but does not return user information. Expected to be
   * used in validating If user exists before sending It to
   * repo
   * @param userId
   */
  private async verifyUserExistence(
    name: string,
    userId?: string,
    emailAddress?: string,
  ): Promise<void> {
    let user: UserRecord | null;
    if (userId) {
      isValidHexId(userId);
      user = await this.userRepository.getUserById(userId);
    } else if (emailAddress) {
      user = await this.userRepository.getUserByEmail(emailAddress);
    } else {
      throw new ApplicationError('Invalid verifyUserExistence method use');
    }
    if (!user) {
      throw new NotFoundError(`${name} not found`, userId ?? emailAddress);
    }
    if (!user.isEnabled || !user.isDeleted) {
      throw new UnauthorizedError(`${name} not able to perform this operation`);
    }
  }
}
