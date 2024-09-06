import { Controller, Get } from '@nestjs/common';
import { MoviesService } from 'src/modules/utils/src/movies/movies.service';
import { MovieResponse } from '../../utils';
import { UserRepository } from 'src/modules/repository/src/user.repository';

@Controller()
export class UserController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly userRepository: UserRepository,
  ) {}

  @Get()
  async testingEndpoint() {
    await this.userRepository.createUser();
  }
}
