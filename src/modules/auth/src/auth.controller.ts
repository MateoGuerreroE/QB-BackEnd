import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApplicationResponse,
  ControllerResponse,
  ErrorResponse,
  UnauthorizedError,
} from 'src/modules/utils';
import { UserLoginData } from './dtos/UserLoginData.dto';
import { UserCreateInput } from 'src/modules/repository';
import { validateClassComposition } from 'src/modules/utils';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() userInfo: UserLoginData): Promise<ControllerResponse> {
    const classErrors = await validateClassComposition(UserLoginData, userInfo);
    if (classErrors.length) {
      throw new ErrorResponse(classErrors.join(', '), 400);
    }
    const { emailAddress, password } = userInfo;
    try {
      const user = await this.authService.loginUser(emailAddress, password);
      return new ApplicationResponse(user, 200);
    } catch (error: any) {
      if (error instanceof UnauthorizedError) {
        console.log(error.getDebugMessage());
      }
      throw new ErrorResponse(error.message, error.status);
    }
  }

  @Post('/register')
  async register(
    @Body() userInput: UserCreateInput,
  ): Promise<ControllerResponse> {
    try {
      const errors = await validateClassComposition(UserCreateInput, userInput);
      if (errors.length) {
        throw new ErrorResponse(errors.join(', '));
      }
      const userResult = await this.authService.registerUser(userInput);
      return new ApplicationResponse(userResult, 201);
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }
}
