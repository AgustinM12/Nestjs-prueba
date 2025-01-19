import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // * VALIDATION PIPE GLOBAL, se deben quitar de los demas lugares
  // * las whitelist solo permite los campos que estan en el DTO
  // app.useGlobalPipes(new ValidationPipe({
  // whitelist: true,
  // }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
