import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import { GatewayController } from './controllers/gateway.controller';
import { GatewayService } from './services/gateway.service';

@Module({
  controllers: [GatewayController],
  providers: [GatewayService]
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));
  const port = Number(process.env.PORT ?? 8080);
  await app.listen(port);
}

bootstrap();
