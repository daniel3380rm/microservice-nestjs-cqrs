import { Module } from '@nestjs/common';
import { CallerService } from './caller.service';
import { CallerController } from './caller.controller';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitMQModule],
  providers: [CallerService],
  controllers: [CallerController],
})
export class CallerModule {}