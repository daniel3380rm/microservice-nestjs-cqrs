import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WalletAnalysis } from './entities/wallet-analysis.entity';
import { Wallet } from '../wallets/entities/wallet.entity';

@Injectable()
export class WalletAnalysisService {
  private readonly logger = new Logger(WalletAnalysisService.name);

  constructor(
    @InjectModel(WalletAnalysis)
    private walletAnalysisModel: typeof WalletAnalysis,
    @InjectModel(Wallet)
    private walletModel: typeof Wallet,
  ) {}

  async analyzeAllWallets() {
    try {
      const wallets = await this.walletModel.findAll();
      const analyses = [];
      for (const wallet of wallets) {
        const uniqueTokensTraded = new Set(wallet.swap_time).size;
        const activeTradingDays = wallet.swap_time.length;
        const riskLevel = this.assessRiskLevel(wallet.win_rate);
        const analysis = await this.walletAnalysisModel.create({
          wallet_id: wallet.id,
          network_id: wallet.networkId,
          unique_tokens_traded: uniqueTokensTraded,
          active_trading_days: activeTradingDays,
          risk_level: riskLevel,
          total_profit_loss: wallet.net_profit,
          total_score: wallet.total_score,
        });

        analyses.push(analysis);
      }

      this.logger.log(`Analyzed ${analyses.length} wallets successfully`);
      return analyses;
    } catch (error) {
      this.logger.error('Error analyzing wallets', error.stack);
      throw new Error('Failed to analyze wallets');
    }
  }

  private assessRiskLevel(winRate: number): string {
    if (winRate < 50) return 'High';
    if (winRate < 70) return 'Medium';
    return 'Low';
  }
}
