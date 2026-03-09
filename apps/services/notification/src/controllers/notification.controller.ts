import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { CreateNotificationDto } from '../dto/create-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Get('health')
  health() {
    return { service: 'notification', status: 'ok' };
  }

  @Post()
  create(@Body() dto: CreateNotificationDto) {
    return this.service.create(dto);
  }
}
