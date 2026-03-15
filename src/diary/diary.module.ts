import { Module } from '@nestjs/common';
import { DiaryService } from './diary.service.js';
import { DiaryController } from './diary.controller.js';

@Module({
  controllers: [DiaryController],
  providers: [DiaryService],
  exports: [DiaryService],
})
export class DiaryModule {}
