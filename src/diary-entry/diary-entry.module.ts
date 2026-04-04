import { Module } from '@nestjs/common';
import { DiaryEntryService } from './diary-entry.service.js';
import { DiaryEntryController } from './diary-entry.controller.js';
import { PublicJournalsController } from './public-journals.controller.js';
import { DiaryModule } from '../diary/diary.module.js';

@Module({
  imports: [DiaryModule],
  controllers: [DiaryEntryController, PublicJournalsController],
  providers: [DiaryEntryService],
})
export class DiaryEntryModule {}
