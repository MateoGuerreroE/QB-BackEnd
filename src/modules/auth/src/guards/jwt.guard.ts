import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException('Invalid JWT');
    }
    if (!this.isUserValid(user)) {
      throw new UnauthorizedException('User disabled access');
    }
    return super.canActivate(context) as Promise<boolean>;
  }

  // TODO Stringly type this
  private isUserValid(user: any): boolean {
    if (!user.isEnabled || user.isDeleted) {
      return false;
    }
    return true;
  }
}
