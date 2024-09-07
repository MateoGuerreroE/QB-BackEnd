import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApplicationResponse,
  ControllerResponse,
  ErrorResponse,
  UnauthorizedError,
} from 'src/modules/utils';
import { UserCreateInput } from 'src/modules/repository';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() userInfo: { emailAddress: string; password: string },
  ): Promise<ControllerResponse> {
    // TODO REMOVE THIS AND ADD CLASS VALIDATIONS
    const { emailAddress, password } = userInfo;
    if (!emailAddress || !password) {
      throw new ErrorResponse('Missing credentials');
    }
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
      const userResult = await this.authService.registerUser(userInput);
      return new ApplicationResponse(userResult, 201);
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }
}
