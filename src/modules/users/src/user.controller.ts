import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { UserRecord } from 'src/modules/repository';
import { UserService } from './user.service';
import {
  ApplicationResponse,
  ControllerResponse,
  ErrorResponse,
} from 'src/modules/utils';
import { NotFoundError } from 'src/modules/utils';

@Controller('/users')
// TODO ADD AUTH GUARD FOR EXTRACTING AUTHOR
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers(): Promise<ControllerResponse> {
    const userList: UserRecord[] = await this.userService.getUserList();
    return new ApplicationResponse(userList, 200);
  }

  @Get('/find')
  @HttpCode(HttpStatus.OK)
  async getUser(
    @Query('id') id?: string,
    @Query('email') email?: string,
  ): Promise<ControllerResponse> {
    if (!id && !email) {
      return new ErrorResponse('Invalid parameters', 400);
    }
    try {
      let response: UserRecord;
      if (id) {
        response = await this.userService.getUser(id);
      } else {
        response = await this.userService.getUserByEmail(email);
      }
      return new ApplicationResponse(response, 200);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        console.log(error.getDebugMessage());
      }
      throw new ErrorResponse(error.message, error.status);
    }
  }

  @Delete('/delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id') id: string) {
    try {
      await this.userService.deleteUser(id, '66da741be1f11400d7d3e031');
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        console.log(error.getDebugMessage());
      }
      throw new ErrorResponse(error.message, error.status);
    }
  }
}
