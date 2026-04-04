import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DiaryEntryService } from './diary-entry.service.js';
import { DiaryEntryEntity } from './dto/diary-entry.entity.js';

@ApiTags('public-journals')
@Controller('public/journals')
export class PublicJournalsController {
  constructor(private readonly diaryEntryService: DiaryEntryService) {}

  @Get()
  @ApiOperation({ summary: 'List all published journal entries from public diaries' })
  @ApiQuery({ name: 'diaryId', required: false })
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiOkResponse({ description: 'List of public journal entries', type: DiaryEntryEntity, isArray: true })
  findAll(@Query('diaryId') diaryId?: string, @Query('take') take?: string, @Query('skip') skip?: string) {
    return this.diaryEntryService.findAllPublic({
      diaryId,
      take: take ? Number(take) : undefined,
      skip: skip ? Number(skip) : undefined,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a public, published journal entry by ID' })
  @ApiOkResponse({ description: 'The public journal entry details', type: DiaryEntryEntity })
  findOne(@Param('id') id: string) {
    return this.diaryEntryService.findOnePublic(id);
  }
}
