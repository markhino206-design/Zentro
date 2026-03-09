import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get('health')
  health() {
    return { service: 'product', status: 'ok' };
  }

  @Get()
  list() {
    return this.service.list();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.service.create(dto);
  }
}
