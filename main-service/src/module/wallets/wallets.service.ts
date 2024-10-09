import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wallet } from './entities/wallet.entity';
import { createReadStream } from 'fs';
import { parse } from 'JSONStream';
import logger from '../../utils/logger';
import { retry } from '../../utils/retry';

import { RabbitMQService } from '../../rabbitmq/rabbitmq.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { GetAllWalletsParamsDto } from './dto/get-all-wallets-params.dto';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet)
    private walletModel: typeof Wallet,
    private rabbitMQService: RabbitMQService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAllWallets(params: GetAllWalletsParamsDto) {
    const { page, pageSize, sort_by, order } = params;
    const offset = (page - 1) * pageSize;

    const cacheKey = `all_wallets_${page}_${pageSize}_${sort_by}_${order}`;
    const cachedResult = await this.cacheManager.get(cacheKey);

    if (cachedResult) {
      logger.info('Retrieved wallets from cache');
      return cachedResult;
    }

    try {
      const startTime = Date.now();

      let orderOptions: any[] = [];
      if (sort_by) {
        orderOptions.push([sort_by, order || 'asc']);
      }
      console.log('sort_by');
      const { count, rows: wallets } = await this.walletModel.findAndCountAll({
        limit: pageSize,
        offset: offset,
        order: orderOptions,
      });
      const latency = Date.now() - startTime;
      logger.info(`Retrieved wallets from database. Latency: ${latency}ms`);

      const result = {
        data: wallets,
        meta: {
          total: count,
          page: page,
          pageSize: pageSize,
          totalPages: Math.ceil(count / pageSize),
        },
      };

      await this.cacheManager.set(cacheKey, result, 60 * 60 * 1000);

      return result;
    } catch (error) {
      logger.error('Error retrieving wallets', error.stack);
      throw new HttpException(
        'Failed to retrieve wallets',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getWalletByAddress(address: string) {
    const cacheKey = `wallet_${address}`;
    const cachedWallet = await this.cacheManager.get<Wallet>(cacheKey);

    if (cachedWallet) {
      logger.info(`Retrieved wallet ${address} from cache`);
      return cachedWallet;
    }

    try {
      const startTime = Date.now();
      const wallet = await this.walletModel.findOne({ where: { address } });
      const latency = Date.now() - startTime;
      if (!wallet) {
        logger.warn(`Wallet not found: ${address}`);
        throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
      }
      logger.info(
        `Retrieved wallet ${address} from database. Latency: ${latency}ms`,
      );

      await this.cacheManager.set(cacheKey, wallet, 60 * 60 * 1000); // کش برای 1 ساعت

      return wallet;
    } catch (error) {
      logger.error(`Error retrieving wallet ${address}`, { error });
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to retrieve wallet',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getWalletSummary() {
    const cacheKey = 'wallet_summary';
    const cachedSummary = await this.cacheManager.get(cacheKey);

    if (cachedSummary) {
      logger.info('Retrieved wallet summary from cache');
      return cachedSummary;
    }
    console.log(cachedSummary);
    console.log('-------');

    try {
      const startTime = Date.now();
      const totalWallets = await this.walletModel.count();
      const avgProfit =
        (await this.walletModel.sum('total_profit')) / totalWallets;
      console.log('totalWallets');
      console.log(avgProfit);

      const latency = Date.now() - startTime;
      logger.info(
        `Retrieved wallet summary from database. Latency: ${latency}ms`,
      );

      const summary = {
        total_wallets: totalWallets,
        average_profit: avgProfit,
      };
      console.log(summary);
      await this.cacheManager.set(cacheKey, summary, 60 * 60 * 1000);

      return summary;
    } catch (error) {
      logger.error('Error retrieving wallet summary', { error });
      throw new HttpException(
        'Failed to retrieve wallet summary',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async importWallets(walletsData: any[]) {
    const results = {
      created: 0,
      updated: 0,
      skipped: 0,
    };

    for (const walletData of walletsData) {
      try {
        const [wallet, created] = await this.walletModel.findOrCreate({
          where: { address: walletData.walletAddress },
          defaults: {
            networkId: walletData.networkId,
            avgBuyAmount: walletData.avgBuyAmount,
            winRate: walletData.winRate,
            net_profit: +walletData.netProfit,
            total_profit: +walletData.netProfit,
            avgHoldingTime: walletData.avgHoldingTime,
            buyAmountLabel: walletData.buyAmountLabel,
            win_rate: walletData.winRate,
            totalScore: walletData.totalScore,
            swap_time: walletData.SwapTime,
          },
        });

        if (created) {
          results.created++;
        } else {
          await wallet.update({
            networkId: walletData.networkId,
            avgBuyAmount: walletData.avgBuyAmount,
            winRate: walletData.winRate,
            net_profit: +walletData.netProfit,
            avgHoldingTime: walletData.avgHoldingTime,
            buyAmountLabel: walletData.buyAmountLabel,
            totalScore: walletData.totalScore,
            win_rate: walletData.winRate,
            total_profit: +walletData.netProfit,
          });
          results.updated++;
        }
      } catch (error) {
        console.error(
          `Error processing wallet ${walletData.walletAddress}:`,
          error,
        );
        results.skipped++;
      }
    }

    return results;
  }
}
