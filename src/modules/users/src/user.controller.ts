import { Controller, Get } from '@nestjs/common';
import { UserRecord } from 'src/modules/repository';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    const userList: UserRecord[] = await this.userService.getUserList();
  }
}
