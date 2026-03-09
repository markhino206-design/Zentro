import { Injectable } from '@nestjs/common';
import { CreateShippingDto } from '../dto/create-shipping.dto';

@Injectable()
export class ShippingService {
  create(payload: CreateShippingDto) {
    return { service: 'shipping', payload };
  }
}
