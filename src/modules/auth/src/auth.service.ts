import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  loginUser(emailAddress: string, password: string) {}

  registerUser() {}
}
