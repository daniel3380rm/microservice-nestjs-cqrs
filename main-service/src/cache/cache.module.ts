import { Module } from '@nestjs/common';
import { CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<CacheModuleOptions> => {
        const store = await redisStore({
          socket: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
          },
          password: configService.get<string>('REDIS_PASSWORD'),
          database: configService.get<number>('REDIS_DB', 0),
          ttl: configService.get<number>('REDIS_TTL', 86400),
        });
        return {
          store: store as unknown as CacheModuleOptions['store'],
          ttl: configService.get<number>('REDIS_TTL', 86400),
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {}
