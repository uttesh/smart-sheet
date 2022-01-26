import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
    if (!device._id) {
      device._id = new Types.ObjectId();
      const createdDevice = new this.deviceModel(device);
      return createdDevice.save();
    } else {
      return await this.deviceModel.findByIdAndUpdate(device._id, device);
    }
  }

  async saveDeviceData(deviceData: DeviceData): Promise<DeviceData> {
    const createdDeviceData = new this.deviceDataModel(deviceData);
    return await createdDeviceData.save();
  }

  async findDeviceDataByDeviceId(deviceId: string): Promise<DeviceData[]> {
    return await this.deviceDataModel
      .find({ deviceId: deviceId })
      .sort({ createdDate: -1 })
      .exec();
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

  async deleteById(deviceId: string) {
    await this.deviceModel.deleteOne({ _id: deviceId }).exec();
  }
}
