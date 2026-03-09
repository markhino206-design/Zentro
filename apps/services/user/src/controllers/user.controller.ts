import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('health')
  health() {
    return { service: 'user', status: 'ok' };
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }
}
