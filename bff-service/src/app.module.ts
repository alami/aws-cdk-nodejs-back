import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import {AppService, CACHE_TTL} from './app.service'
import { CacheModule } from '@nestjs/cache-manager'
@Module({
  imports: [CacheModule.register({ ttl: CACHE_TTL })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
