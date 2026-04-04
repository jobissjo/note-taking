import { Module } from '@nestjs/common';
import { StoriesController } from './stories.controller.js';
import { PublicStoriesController } from './public-stories.controller.js';
import { StoriesService } from './stories.service.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [StoriesController, PublicStoriesController],
  providers: [StoriesService]
})
export class StoriesModule {}
