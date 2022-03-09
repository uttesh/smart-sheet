import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeviceModule } from './device/device.module';
import { PubsubController } from './pubsub/pubsub.controller';
import { PubsubService } from './service/pubsub/pubsub.service';
import { PUBSUB, PUBSUB_SERVICE } from './constants';
@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://mongo/smart-sheet'),
    ClientsModule.register([
      {
        name: PUBSUB_SERVICE,
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://localhost:1883',
        },
      },
    ]),
    MongooseModule.forRoot('mongodb://localhost:27017/smart-sheet'),
    DeviceModule,
  ],
  controllers: [AppController, PubsubController],
  providers: [AppService, PubsubService],
})
export class AppModule {}
