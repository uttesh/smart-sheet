import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PayloadBean } from './payload.bean';

@Injectable()
export class HttpClientService {
  constructor(private httpService: HttpService) {}

  sendDeviceDataToSmartSheet(payload: PayloadBean) {
    console.log(
      'HttpClientService::sendDeviceDataToSmartSheet:: payload :: ',
      payload,
    );
    //localhost:3006/devices/data
    this.httpService
      .post('http://localhost:3006/devices/data', payload)
      .subscribe((data) => {
        console.log('received response :::');
      });
  }
}
