import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): Observable<number> {
    console.log('accumulate :::data', data);
    return new Observable((observer) => observer.next(1));
  }

  @MessagePattern({ cmd: 'currentTime' })
  getNextLaunchRemainingTime(payload: number[]) {
    console.log('payload ::getNextLaunchRemainingTime ', payload);
    return new Date().getTime();
  }

  @MessagePattern({ cmd: 'broadcast' })
  replyBroadcast(): Observable<number> {
    console.log('broadcast ::replyBroadcast ');
    return new Observable((observer) => observer.next(1));
  }
}
