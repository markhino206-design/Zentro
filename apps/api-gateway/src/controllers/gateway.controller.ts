import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GatewayService } from '../services/gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gateway: GatewayService) {}

  @Post('auth/register')
  register(@Body() body: Record<string, unknown>) {
    return this.gateway.forward('auth', '/register', body);
  }

  @Post('auth/login')
  login(@Body() body: Record<string, unknown>) {
    return this.gateway.forward('auth', '/login', body);
  }

  @Get('products')
  getProducts() {
    return this.gateway.forward('product', '/products');
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string) {
    return this.gateway.forward('product', `/products/${id}`);
  }

  @Post('orders')
  createOrder(@Body() body: Record<string, unknown>) {
    return this.gateway.forward('order', '/orders', body);
  }

  @Post('reviews')
  createReview(@Body() body: Record<string, unknown>) {
    return this.gateway.forward('review', '/reviews', body);
  }
}
