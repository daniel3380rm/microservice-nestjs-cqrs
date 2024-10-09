import { PartialType } from '@nestjs/swagger';
import { CreateWalletAnalysisDto } from './create-wallet-analysis.dto';

export class UpdateWalletAnalysisDto extends PartialType(CreateWalletAnalysisDto) {}
