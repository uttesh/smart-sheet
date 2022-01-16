import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export class BaseModel extends Document {
  @Prop()
  createdDate: Date = new Date();

  @Prop()
  updatedDate: Date = new Date();
}
