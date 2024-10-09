import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.close();
  }

  private async connect() {
    const rabbitmqUrl = this.configService.get<string>('rabbitmq.url');
    this.connection = await amqp.connect(rabbitmqUrl);
    this.channel = await this.connection.createChannel();
  }

  async close() {
    await this.channel.close();
    await this.connection.close();
  }

  async sendMessage(queue: string, message: string) {
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
  }

  async consumeMessages(queue: string, callback: (msg: amqp.ConsumeMessage | null) => void) {
    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.consume(queue, callback, { noAck: false });
  }
}