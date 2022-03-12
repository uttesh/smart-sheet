import { Injectable } from '@nestjs/common';
import { Subscribe, Payload, Topic } from 'nest-mqtt';
import { HttpClientService } from './http.client';

@Injectable()
export class AppService {
  constructor(private httpClientService: HttpClientService) {}

  @Subscribe('device/data')
  async deviceData(@Payload() payload) {
    console.log('Subscribe ::::::::; device/data:: payload :: ', payload);
    await this.httpClientService.sendDeviceDataToSmartSheet(payload);
  }
}
