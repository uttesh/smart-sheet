import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseHeaderInterceptor } from './base/web/AppHeaderInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalInterceptors(new ResponseHeaderInterceptor());
  await app.listen(3006);
}
bootstrap();
