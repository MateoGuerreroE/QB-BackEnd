import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRecord } from 'src/modules/repository';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException('Invalid JWT');
    }
    if (!this.isUserValid(user)) {
      throw new UnauthorizedException('User disabled access');
    }
    return result;
  }

  private isUserValid(user: Partial<UserRecord>): boolean {
    if (!user.isEnabled || user.isDeleted) {
      return false;
    }
    return true;
  }
}
