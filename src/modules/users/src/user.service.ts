import { Injectable } from '@nestjs/common';
import { UserRecord, UserToCreate, UserToUpdate } from 'src/modules/repository';
import { UserRepository } from 'src/modules/repository';
import { UserCreateInput } from 'src/modules/repository/src/dtos/UserCreateInput.dto';
import { UserUpdateInput } from 'src/modules/repository/src/dtos/UserUpdateInput.dto';
import { ApplicationError } from 'src/modules/utils';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserList(): Promise<UserRecord[]> {
    return this.userRepository.getAllUsers();
  }

  async getUser(userId: string): Promise<UserRecord> {
    const result = await this.userRepository.getUserById(userId);
    if (!result) {
      // TODO IMPLEMENT CUSTOM NOTFOUND ERROR
      return;
    }
    return result;
  }

  async getUserByEmail(userEmail: string): Promise<UserRecord> {
    const result = await this.userRepository.getUserByEmail(userEmail);
    if (!result) {
      // TODO IMPLEMENT CUSTOM NOTFOUND ERROR
      return;
    }
    return result;
  }

  async createUser(
    userInfo: UserCreateInput,
    creatorId: string,
  ): Promise<UserRecord> {
    const userToCreate: UserToCreate = {
      ...userInfo,
      createdBy: creatorId,
    };
    const isEmailInUse = await this.verifyUserExistence(
      null,
      userInfo.emailAddress,
    );
    const isCreatorValid = await this.verifyUserExistence(creatorId);
    if (isEmailInUse) {
      throw new ApplicationError('Email is in use', 409);
    } else if (!isCreatorValid) {
      throw new ApplicationError('Invalid creator', 400);
    }
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
    const { userId, ...updates } = userInfo;
    const userToUpdate: UserToUpdate = {
      ...updates,
      updatedBy: updaterId,
    };
    // Ensure user exists
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      // TODO IMPLEMENT CUSTOM NOTFOUND ERROR
      return;
    }
    const isUpdaterValid = await this.verifyUserExistence(updaterId);
    if (!isUpdaterValid) {
      throw new ApplicationError('Invalid updater', 400);
    }
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
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      // TODO IMPLEMENT CUSTOM NOTFOUND ERROR
      return;
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
   * Util private method to validate If user exists,
   * but does not return user information. Expected to be
   * used in validating If user exists before sending It to
   * repo
   * @param userId
   */
  private async verifyUserExistence(
    userId?: string,
    emailAddress?: string,
  ): Promise<boolean> {
    let user: UserRecord | null;
    if (userId) {
      user = await this.userRepository.getUserById(userId);
    } else if (emailAddress) {
      user = await this.userRepository.getUserByEmail(emailAddress);
    } else {
      throw new ApplicationError('Invalid verifyUserExistence method use');
    }
    if (user) {
      return true;
    }
    return false;
  }
}
