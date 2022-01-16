import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from './device.model';
import { DeviceData, DeviceDataDocument } from './devicedata.model';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
    @InjectModel(DeviceData.name)
    private deviceDataModel: Model<DeviceDataDocument>,
  ) {}
  private readonly devices: Device[] = [];

  async save(device: Device): Promise<Device> {
    const createdDevice = new this.deviceModel(device);
    return await createdDevice.save();
  }

  async saveDeviceData(deviceData: DeviceData): Promise<DeviceData> {
    const createdDeviceData = new this.deviceDataModel(deviceData);
    return await createdDeviceData.save();
  }

  async findDeviceDataByDeviceId(deviceId: string): Promise<DeviceData[]> {
    return await this.deviceDataModel.find({ deviceId: deviceId }).exec();
  }

  async findAll(): Promise<Device[]> {
    return await this.deviceModel.find().exec();
  }

  async findByName(deviceName: string): Promise<Device> {
    return await this.deviceModel.findOne({ name: deviceName }).exec();
  }

  async findById(deviceId: string): Promise<Device> {
    return await this.deviceModel.findOne({ _id: deviceId }).exec();
  }
}
