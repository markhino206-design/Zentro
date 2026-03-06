import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { CreateReviewDto } from '../dto/create-review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly service: ReviewService) {}

  @Get('health')
  health() {
    return { service: 'review', status: 'ok' };
  }

  @Post()
  create(@Body() dto: CreateReviewDto) {
    return this.service.create(dto);
  }
}
