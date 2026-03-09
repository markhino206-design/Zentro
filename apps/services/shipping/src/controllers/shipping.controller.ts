import { Body, Controller, Get, Post } from '@nestjs/common';
import { ShippingService } from '../services/shipping.service';
import { CreateShippingDto } from '../dto/create-shipping.dto';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly service: ShippingService) {}

  @Get('health')
  health() {
    return { service: 'shipping', status: 'ok' };
  }

  @Post()
  create(@Body() dto: CreateShippingDto) {
    return this.service.create(dto);
  }
}
