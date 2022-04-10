import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Res,
} from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Observable, scan, take } from 'rxjs';
import { PUBSUB, PUBSUB_SERVICE } from '../constants';
import { PubsubService } from '../service/pubsub/pubsub.service';
import { Response } from 'express';

@Controller('pubsub')
export class PubsubController {
  @Client({ transport: Transport.MQTT })
  client: ClientProxy;

  constructor(private pubsubService: PubsubService) {}

  @Get('getCurrentTime')
  getNextLaunchRemainingTime(): Observable<any> {
    console.log('PubsubController:::updated::::::', this.client);
    try {
      // this.clientProxy.connect();
      const pattern = { cmd: 'sum' };
      const data = [1, 2, 3, 4, 5];
      return this.client.send(pattern, data);
    } catch (error) {
      console.error(error);
    }
    throw new HttpException('Internal Error', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @Get('broadcast')
  async multicats(@Res() res: Response) {
    console.log('broadcast :::');
    this.pubsubService.getCurrentTime().subscribe((data) => {
      console.log('completed :: ', data);
      res.status(HttpStatus.OK).json(data);
    });
  }
}
