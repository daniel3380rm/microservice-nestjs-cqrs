import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CallerModule } from './caller/caller.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CallerModule,
    RabbitMQModule,
  ],
})
export class AppModule {}