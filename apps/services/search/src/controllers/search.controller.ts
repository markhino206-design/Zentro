import { Body, Controller, Get, Post } from '@nestjs/common';
import { SearchService } from '../services/search.service';
import { CreateSearchDto } from '../dto/create-search.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly service: SearchService) {}

  @Get('health')
  health() {
    return { service: 'search', status: 'ok' };
  }

  @Post()
  create(@Body() dto: CreateSearchDto) {
    return this.service.create(dto);
  }
}
