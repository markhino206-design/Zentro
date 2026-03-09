import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get('health')
  health() {
    return { service: 'auth', status: 'ok' };
  }

  @Post('register')
  register(@Body() dto: CreateAuthDto) {
    return this.service.register(dto);
  }

  @Post('login')
  login(@Body() dto: CreateAuthDto) {
    return this.service.login(dto);
  }
}
