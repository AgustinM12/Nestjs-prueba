import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // * VALIDATION PIPE GLOBAL, se deben quitar de los demas lugares
  // * las whitelist solo permite los campos que estan en el DTO
  // app.useGlobalPipes(new ValidationPipe({
  // whitelist: true,
  // }));

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors()

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
