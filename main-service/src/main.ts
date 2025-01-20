import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Wallet Service API')
    .setDescription('API documentation for the Wallet Service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
// Dummy change - 2025-01-18 16:32:51

// Dummy change - 2025-01-18 16:33:30

// Dummy change - 2025-01-18 16:49:24

// Dummy change - 2025-01-18 16:50:15

// Dummy change - 2025-01-19 16:50:16

// Dummy change - 2025-01-20 16:50:17
