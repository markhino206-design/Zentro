import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductService {
  list() {
    return { items: [], total: 0, page: 1, pageSize: 20 };
  }

  getById(id: string) {
    return { id, status: 'stubbed' };
  }

  create(payload: CreateProductDto) {
    return { service: 'product', action: 'create', payload };
  }
}
