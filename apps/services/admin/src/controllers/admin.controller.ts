import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { CreateAdminDto } from '../dto/create-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Get('health')
  health() {
    return { service: 'admin', status: 'ok' };
  }

  @Post()
  create(@Body() dto: CreateAdminDto) {
    return this.service.create(dto);
  }
}
