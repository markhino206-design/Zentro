import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from '../dto/create-review.dto';

@Injectable()
export class ReviewService {
  create(payload: CreateReviewDto) {
    return { service: 'review', action: 'create', payload };
  }
}
