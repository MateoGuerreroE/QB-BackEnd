import { Controller, Get } from '@nestjs/common';
import { MoviesService } from 'src/modules/utils';

@Controller()
export class UserController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async testingEndpoint() {}
}
