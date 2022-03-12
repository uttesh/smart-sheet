import { Inject, Injectable } from '@nestjs/common';
import { MqttService } from 'nest-mqtt';
import { PayloadBean } from './payload.bean';

@Injectable()
export class PublisherService {
  constructor(@Inject(MqttService) private readonly mqttService: MqttService) {}

  async deviceCmd(payload: PayloadBean) {
    this.mqttService.publish('topic', payload);
  }
}
