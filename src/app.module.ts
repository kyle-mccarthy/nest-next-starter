import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from './cache/cache.module';
import { ConfigModule } from './config/config.module';
import RenderModule from './render/render.module';

@Module({
  imports: [RenderModule, CacheModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
