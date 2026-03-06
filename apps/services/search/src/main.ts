import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import { SearchController } from './controllers/search.controller';
import { SearchService } from './services/search.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService]
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));
  const defaultPortByService: Record<string, number> = {
    auth: 3001,
    user: 3002,
    product: 3003,
    search: 3004,
    order: 3005,
    payment: 3006,
    review: 3007,
    notification: 3008,
    shipping: 3009,
    admin: 3010
  };
  const port = Number(process.env.PORT ?? defaultPortByService['search']);
  await app.listen(port);
}

bootstrap();
