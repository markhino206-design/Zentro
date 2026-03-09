import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Get('health')
  health() {
    return { service: 'payment', status: 'ok' };
  }

  @Post()
  create(@Body() dto: CreatePaymentDto) {
    return this.service.create(dto);
  }
}
