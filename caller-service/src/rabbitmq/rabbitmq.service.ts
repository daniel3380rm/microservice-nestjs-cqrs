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

  async acknowledgeMessage(msg: amqp.ConsumeMessage) {
    if (this.channel) {
      this.channel.ack(msg);
    } else {
      throw new Error('RabbitMQ channel is not initialized');
    }
  }

  async close() {
    await this.channel.close();
    await this.connection.close();
  }

  async consumeMessages(
    queueName: string,
    callback: (msg: amqp.ConsumeMessage | null) => void,
  ) {
    if (!this.channel) {
      throw new Error('RabbitMQ channel is not initialized');
    }

    await this.channel.assertQueue(queueName, { durable: true });

    this.channel.consume(queueName, (msg) => {
      if (msg !== null) {
        callback(msg);
      }
    });
  }

  async sendMessage(queue: string, message: string) {
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
  }
}
