import { Module } from '@nestjs/common';
import { DiaryEntryService } from './diary-entry.service.js';
import { DiaryEntryController } from './diary-entry.controller.js';
import { DiaryModule } from '../diary/diary.module.js';

@Module({
  imports: [DiaryModule],
  controllers: [DiaryEntryController],
  providers: [DiaryEntryService],
})
export class DiaryEntryModule {}
