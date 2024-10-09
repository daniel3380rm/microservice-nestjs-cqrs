import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WalletsModule } from './module/wallets/wallets.module';
import { DatabaseModule } from './database/database.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { RedisCacheModule } from './cache/cache.module';
import { CacheModule } from '@nestjs/cache-manager';
import { WalletAnalysisModule } from './module/wallet-analysis/wallet-analysis.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CacheModule.register(),

    DatabaseModule,
    WalletsModule,
    RabbitMQModule,
    RedisCacheModule,
    WalletAnalysisModule,
  ],
})
export class AppModule {}
