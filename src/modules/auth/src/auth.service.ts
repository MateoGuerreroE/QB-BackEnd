import { Injectable } from '@nestjs/common';
import {
  UserRecord,
  UserRepository,
  UserToCreate,
} from 'src/modules/repository';
import { ApplicationError, UnauthorizedError } from 'src/modules/utils';
import { hashPassword, verifyPassword } from './utils';
import { UserCreateInput } from 'src/modules/repository/src/dtos/UserCreateInput.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async loginUser(emailAddress: string, password: string): Promise<UserRecord> {
    const rawUser = await this.userRepository.getRawUserByEmail(emailAddress);
    if (!rawUser) {
      throw new UnauthorizedError('Bad Credentials', 'User does not exist');
    }
    const isValid = await verifyPassword(password, rawUser.secret);
    if (!isValid) {
      throw new UnauthorizedError('Bad Credentials', 'Bad password');
    }
    const user = await this.userRepository.getUserById(rawUser.userId);
    return user;
  }

  async registerUser(userInput: UserCreateInput): Promise<UserRecord> {
    if (!userInput.secret) {
      throw new ApplicationError('Password is needed');
    }
    const userToCreate: UserToCreate = {
      ...userInput,
      secret: await hashPassword(userInput.secret),
      createdBy: 'SYSTEM',
    };
    const existingEmail = await this.userRepository.getUserByEmail(
      userInput.emailAddress,
    );
    if (existingEmail) {
      throw new ApplicationError('Email is in use', 406);
    }
    try {
      const result = await this.userRepository.createUser(userToCreate);
      return result;
    } catch (error: any) {
      throw new ApplicationError(error.message);
    }
  }
}
