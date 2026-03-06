import { Injectable } from '@nestjs/common';
import { CreateSearchDto } from '../dto/create-search.dto';

@Injectable()
export class SearchService {
  create(payload: CreateSearchDto) {
    return { service: 'search', payload };
  }
}
