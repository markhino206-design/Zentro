import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from '../dto/create-payment.dto';

@Injectable()
export class PaymentService {
  create(payload: CreatePaymentDto) {
    return { service: 'payment', payload };
  }
}
