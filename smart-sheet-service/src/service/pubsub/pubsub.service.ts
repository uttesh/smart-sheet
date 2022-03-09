import { Inject, Injectable } from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { PUBSUB, PUBSUB_SERVICE } from '../../constants';

@Injectable()
export class PubsubService {
  constructor(
    @Inject(PUBSUB_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  getCurrentTime(): Observable<number> {
    console.log('getCurrentTime :');
    try {
      const pattern = { cmd: 'sum' };
      const data = [1, 2, 3, 4, 5];
      return this.clientProxy.send<number>(pattern, data);
    } catch (error) {
      console.error(error);
    }
  }
}
