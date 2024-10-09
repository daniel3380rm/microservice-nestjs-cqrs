import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetAllWalletsParamsDto } from './dto/get-all-wallets-params.dto';

@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all wallets' })
  @ApiQuery({
    name: 'sort_by',
    required: false,
    enum: ['total_profit', 'num_tokens_traded', 'num_active_days'],
  })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'] })
  async getAllWallets(@Query() params: GetAllWalletsParamsDto) {
    return this.walletsService.getAllWallets(params);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Get wallet summary' })
  async getWalletSummary() {
    return this.walletsService.getWalletSummary();
  }

  @Get(':address')
  @ApiOperation({ summary: 'Get wallet by address' })
  @ApiParam({ name: 'address', required: true, description: 'Wallet address' })
  async getWalletByAddress(@Param('address') address: string) {
    return this.walletsService.getWalletByAddress(address);
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async importWallets(@UploadedFile() file: Express.Multer.File) {
    const walletsData = JSON.parse(file.buffer.toString());
    return this.walletsService.importWallets(walletsData);
  }
}
