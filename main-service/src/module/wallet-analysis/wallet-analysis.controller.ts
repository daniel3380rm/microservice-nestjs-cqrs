import { Controller, Get } from '@nestjs/common';
import { WalletAnalysisService } from './wallet-analysis.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('analyze')
@ApiTags('analyze')
export class WalletAnalysisController {
  constructor(private readonly walletAnalysisService: WalletAnalysisService) {}

  @Get('')
  async analyzeWallet() {
    return this.walletAnalysisService.analyzeAllWallets();
  }
}
