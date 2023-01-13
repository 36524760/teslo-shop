import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('main')

  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  const config = new DocumentBuilder()
    .setTitle('teslo api')
    .setDescription('the teslo api description')
    .setVersion('1.0')
    .addTag('teslo')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  await app.listen(process.env.PORT);
  logger.log(`App running at port:${process.env.PORT}`)
}
bootstrap();
