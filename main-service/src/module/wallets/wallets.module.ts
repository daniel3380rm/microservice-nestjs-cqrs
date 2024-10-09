import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { Wallet } from './entities/wallet.entity';
import { RabbitMQModule } from '../../rabbitmq/rabbitmq.module';
import { RedisCacheModule } from '../../cache/cache.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Wallet]),
    RedisCacheModule,
    RabbitMQModule,
  ],
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class WalletsModule {}
