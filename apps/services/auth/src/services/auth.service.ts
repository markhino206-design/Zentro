import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';

@Injectable()
export class AuthService {
  register(payload: CreateAuthDto) {
    return { service: 'auth', action: 'register', payload };
  }

  login(payload: CreateAuthDto) {
    return {
      service: 'auth',
      action: 'login',
      payload: { email: payload.email },
      token: 'jwt-token-stub'
    };
  }
}
