import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqttModule } from 'nest-mqtt';
import { HttpModule } from '@nestjs/axios';
import { PublisherService } from './publisher.service';
import { HttpClientService } from './http.client';
@Module({
  imports: [MqttModule.forRoot({ host: 'broker', port: 1883 }), HttpModule],
  controllers: [AppController],
  providers: [AppService, PublisherService, HttpClientService],
})
export class AppModule {}
