import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from '../dto/create-notification.dto';

@Injectable()
export class NotificationService {
  create(payload: CreateNotificationDto) {
    return { service: 'notification', payload };
  }
}
