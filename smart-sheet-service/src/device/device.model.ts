import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseModel } from '../base/Base.model';

export type DeviceDocument = Device & Document;

@Schema()
export class Device extends BaseModel {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  params: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
