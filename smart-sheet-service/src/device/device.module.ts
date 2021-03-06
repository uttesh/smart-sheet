import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceController } from './device.controller';
import { Device, DeviceSchema } from './device.model';
import { DeviceService } from './device.service';
import { DeviceData, DeviceDataSchema } from './devicedata.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
    MongooseModule.forFeature([
      { name: DeviceData.name, schema: DeviceDataSchema },
    ]),
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
  exports: [DeviceService],
})
export class DeviceModule {}
