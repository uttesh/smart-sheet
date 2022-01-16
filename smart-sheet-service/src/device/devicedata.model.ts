import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { BaseModel } from '../base/Base.model';

export type DeviceDataDocument = DeviceData & Document;

@Schema()
export class DeviceData extends BaseModel {
  @Prop()
  deviceId: string;
  @Prop()
  data: string;
}

export const DeviceDataSchema = SchemaFactory.createForClass(DeviceData);
