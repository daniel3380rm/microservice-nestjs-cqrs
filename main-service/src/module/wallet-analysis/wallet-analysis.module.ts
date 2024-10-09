import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WalletAnalysisController } from './wallet-analysis.controller';
import { WalletAnalysisService } from './wallet-analysis.service';
import { WalletAnalysis } from './entities/wallet-analysis.entity';
import { Wallet } from '../wallets/entities/wallet.entity';

@Module({
  imports: [SequelizeModule.forFeature([WalletAnalysis, Wallet])],
  controllers: [WalletAnalysisController],
  providers: [WalletAnalysisService],
})
export class WalletAnalysisModule {}
