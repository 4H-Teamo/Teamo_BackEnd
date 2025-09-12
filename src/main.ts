import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const frontUrl = configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';

  app.enableCors({
    origin: [frontUrl],
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Teamo Swagger')
    .setDescription('Teamo Apis')
    .setVersion('1.0')
    .addServer('http://211.230.62.32:81/api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get<number>('PORT') ?? 3000);
}
bootstrap();
