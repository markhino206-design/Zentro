import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  create(payload: CreateUserDto) {
    return { service: 'user', payload };
  }
}
