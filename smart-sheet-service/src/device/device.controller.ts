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

@Controller('devices')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Post()
  create(@Body() device: Device, @Res() res: Response) {
    this.deviceService.save(device);
    res.status(HttpStatus.CREATED).send();
  }

  @Post('/:deviceName/data')
  async deviceData(
    @Param('deviceName') deviceName: string,
    @Body() data: string,
    @Res() res: Response,
  ) {
    console.log(`Received ${deviceName}: ${JSON.stringify(data)} :: `);
    const device: Device = await this.deviceService.findByName(deviceName);
    device.data = JSON.stringify(data);
    this.deviceService.save(device);
    console.log('Device Data updated Successfully');
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  findAll(@Res() res: Response) {
    res.status(HttpStatus.OK).json(this.deviceService.findAll());
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() device: Device) {
    return `This action updates a #${id} cat`;
  }

  @Get('/findByName/:name')
  findByName(@Param('name') name: string): string {
    return `This action returns a #${name} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
