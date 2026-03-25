import { Module } from '@nestjs/common';
import { DiaryService } from './diary.service.js';
import { DiaryController } from './diary.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [DiaryController],
  providers: [DiaryService],
  exports: [DiaryService],
})
export class DiaryModule {}
