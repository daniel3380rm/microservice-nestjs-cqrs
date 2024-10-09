import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  Index,
  DeletedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'wallets',
})
export class Wallet extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  @Index
  address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  networkId: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  net_profit: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  total_profit: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  win_rate: number;

  @Column({
    type: DataType.ARRAY(DataType.DATE),
    allowNull: false,
  })
  swap_time: Date[];

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0,
  })
  total_score: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  num_tokens_traded: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  num_active_days: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0,
  })
  avg_trade_volume: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'LOW',
  })
  risk_assessment: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  last_updated: Date;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
