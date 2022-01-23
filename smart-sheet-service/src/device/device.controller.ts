import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Device } from './device.model';
import { DeviceService } from './device.service';
import { DeviceData } from './devicedata.model';

@Controller('devices')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Post()
  create(@Body() device: Device, @Res() res: Response) {
    this.deviceService.save(device);
    res.status(HttpStatus.OK).json(device);
  }

  @Post('/:deviceName/data')
  async deviceData(
    @Param('deviceName') deviceName: string,
    @Body() data: string,
    @Res() res: Response,
  ) {
    const device: Device = await this.deviceService.findByName(deviceName);
    console.log('device :: ', device);
    if (device._id) {
      const deviceData = {
        deviceId: device._id,
        data: JSON.stringify(data),
      } as DeviceData;
      this.deviceService.saveDeviceData(deviceData);
    }
    res.status(HttpStatus.CREATED).send();
  }

  @Get('/:deviceName/data')
  async findAllDeviceData(
    @Param('deviceName') deviceName: string,
    @Res() res: Response,
  ) {
    const device: Device = await this.deviceService.findByName(deviceName);
    console.log('device :: ', device);
    const deviceData: DeviceData[] =
      await this.deviceService.findDeviceDataByDeviceId(device._id.toString());
    console.log('deviceData ::', deviceData);
    res.status(HttpStatus.OK).json(deviceData);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const devices: Device[] = await this.deviceService.findAll();
    res.status(HttpStatus.OK).json(devices);
  }

  @Get(':id')
  async findOne(@Param() params, @Res() res: Response) {
    console.log(params.id);
    const device: Device = await this.deviceService.findById(params.id);
    res.status(HttpStatus.OK).json(device);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedDevice: Device,
    @Res() res: Response,
  ) {
    const device: Device = await this.deviceService.findById(id);
    updatedDevice.updatedDate = new Date();
    this.deviceService.save(device);
    res.status(HttpStatus.CREATED).send();
  }

  @Get('/findByName/:name')
  findByName(@Param('name') name: string): string {
    return `This action returns a #${name} cat`;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.deviceService.deleteById(id);
    res.status(HttpStatus.OK).json({ status: 'Deleted Successfully' });
  }
}
