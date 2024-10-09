import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import logger from '../utils/logger';
import { retry } from '../utils/retry';

@Injectable()
export class CallerService implements OnModuleInit {
  private readonly walletServiceBaseUrl: string;
  private readonly requestsPerMinute: number;

  constructor(
    private rabbitMQService: RabbitMQService,
    private configService: ConfigService,
  ) {
    this.walletServiceBaseUrl = this.configService.get<string>(
      'walletService.baseUrl',
    );
    this.requestsPerMinute =
      this.configService.get<number>('REQUESTS_PER_MINUTE') || 50;
  }

  async onModuleInit() {
    await this.setupMessageConsumers();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    logger.info(`Starting cron job to send ${this.requestsPerMinute} requests`);
    const promises = Array(this.requestsPerMinute)
      .fill(null)
      .map(() => this.sendRandomRequest());
    await Promise.all(promises);
    logger.info(`Completed sending ${this.requestsPerMinute} requests`);
  }

  private async sendRandomRequest() {
    const endpoints = [
      '/wallets',
      `/wallets/${this.generateRandomAddress()}`,
      '/wallets/summary',
    ];
    const randomEndpoint =
      endpoints[Math.floor(Math.random() * endpoints.length)];
    const url = `${this.walletServiceBaseUrl}${randomEndpoint}`;

    const startTime = Date.now();
    try {
      const response = await retry(() => axios.get(url, { timeout: 5000 }), 3);
      const latency = Date.now() - startTime;
      logger.info(`Request to ${url} succeeded. Latency: ${latency}ms`);
      await this.rabbitMQService.sendMessage(
        'wallet_requests',
        JSON.stringify({ url, latency, status: 'success' }),
      );
    } catch (error) {
      const latency = Date.now() - startTime;
      logger.error(`Request to ${url} failed. Latency: ${latency}ms`, {
        error,
      });
      await this.rabbitMQService.sendMessage(
        'wallet_requests',
        JSON.stringify({ url, latency, status: 'error' }),
      );
    }
  }

  private generateRandomAddress(): string {
    // دو روش موجود هست یکیش این میتونه باشه
    return '0x' + Math.random().toString(16).substr(2, 40);
  }

  private async setupMessageConsumers() {
    await this.rabbitMQService.consumeMessages(
      'wallet_analysis_progress',
      (msg) => {
        if (msg) {
          const content = JSON.parse(msg.content.toString());
          logger.info(
            `Wallet analysis progress: ${content.analyzed_count} wallets analyzed`,
          );
          this.rabbitMQService.acknowledgeMessage(msg);
        }
      },
    );

    await this.rabbitMQService.consumeMessages(
      'wallet_analysis_complete',
      (msg) => {
        if (msg) {
          const content = JSON.parse(msg.content.toString());
          logger.info(
            `Wallet analysis completed: ${content.analyzed_count} wallets analyzed`,
          );
          this.rabbitMQService.acknowledgeMessage(msg);
        }
      },
    );

    await this.rabbitMQService.consumeMessages('wallet_updated', (msg) => {
      if (msg) {
        const content = JSON.parse(msg.content.toString());
        logger.info(
          `Wallet updated: ${content.address}, Total Profit: ${content.total_profit}, Risk: ${content.risk_assessment}`,
        );
        this.rabbitMQService.acknowledgeMessage(msg);
      }
    });

    await this.rabbitMQService.consumeMessages('new_wallet_created', (msg) => {
      if (msg) {
        const content = JSON.parse(msg.content.toString());
        logger.info(`New wallet created: ${content.address}`);
        this.rabbitMQService.acknowledgeMessage(msg);
      }
    });
  }
}
