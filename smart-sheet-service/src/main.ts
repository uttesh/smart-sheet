import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ResponseHeaderInterceptor } from './base/web/AppHeaderInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: 'mqtt://localhost:1883',
    },
  });
  // await app.startAllMicroservices();
  // app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalInterceptors(new ResponseHeaderInterceptor());
  await app.listen(3006);
}

bootstrap();
