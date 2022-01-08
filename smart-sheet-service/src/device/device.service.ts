import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from './device.model';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}
  private readonly devices: Device[] = [];

  async save(device: Device): Promise<Device> {
    const createdCat = new this.deviceModel(device);
    return await createdCat.save();
  }

  async findAll(): Promise<Device[]> {
    return await this.deviceModel.find().exec();
  }

  async findByName(deviceName: string): Promise<Device> {
    return await this.deviceModel.findOne({ name: deviceName }).exec();
  }
}
