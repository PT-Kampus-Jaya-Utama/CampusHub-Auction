import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RecommendationsModule } from './recommendations/recommendations.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RecommendationsModule,
  ],
})
export class AppModule {}
