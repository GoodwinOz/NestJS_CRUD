import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')
  //handle all input validations
  app.useGlobalPipes(new ValidateInputPipe())

  await app.listen(3000);
}
bootstrap();