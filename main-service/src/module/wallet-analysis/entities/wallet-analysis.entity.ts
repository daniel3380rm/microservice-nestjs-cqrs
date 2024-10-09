import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import { Wallet } from '../../wallets/entities/wallet.entity';

@Table({ tableName: 'wallet_analysis' })
export class WalletAnalysis extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  id: number;

  @ForeignKey(() => Wallet)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: { model: 'wallets', key: 'id' },
  })
  wallet_id: number;

  @BelongsTo(() => Wallet)
  wallet: Wallet;

  @Column({
    type: DataType.DECIMAL(20, 8),
    allowNull: false,
    defaultValue: 0,
  })
  total_profit_loss: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  most_profitable_token: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  least_profitable_token: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  num_unique_tokens_traded: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  active_trading_days: number;

  @Column({
    type: DataType.ENUM('Low', 'Medium', 'High'),
    allowNull: false,
    defaultValue: 'Medium',
  })
  risk_level: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  token_performance: object;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  last_analysis_date: Date;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
