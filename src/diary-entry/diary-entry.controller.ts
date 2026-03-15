import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { DiaryEntryService } from './diary-entry.service.js';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto.js';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto.js';
import { DiaryEntryEntity } from './dto/diary-entry.entity.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@ApiTags('diary-entries')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class DiaryEntryController {
  constructor(private readonly diaryEntryService: DiaryEntryService) {}

  @Post('diaries/:diaryId/entries')
  @ApiOperation({ summary: 'Create a new entry inside a diary' })
  @ApiCreatedResponse({ description: 'Diary entry successfully created', type: DiaryEntryEntity })
  create(
    @Request() req,
    @Param('diaryId') diaryId: string,
    @Body() createDiaryEntryDto: CreateDiaryEntryDto,
  ) {
    return this.diaryEntryService.create(req.user.userId, diaryId, createDiaryEntryDto);
  }

  @Get('diaries/:diaryId/entries')
  @ApiOperation({ summary: 'List all entries in a diary ordered by date descending' })
  @ApiOkResponse({ description: 'List of diary entries', type: DiaryEntryEntity, isArray: true })
  findAll(@Request() req, @Param('diaryId') diaryId: string) {
    return this.diaryEntryService.findAll(req.user.userId, diaryId);
  }

  @Get('diary-entries/:id')
  @ApiOperation({ summary: 'Get a specific diary entry by ID' })
  @ApiOkResponse({ description: 'The diary entry details', type: DiaryEntryEntity })
  findOne(@Request() req, @Param('id') id: string) {
    return this.diaryEntryService.findOne(req.user.userId, id);
  }

  @Patch('diary-entries/:id')
  @ApiOperation({ summary: 'Update a diary entry' })
  @ApiOkResponse({ description: 'The updated diary entry', type: DiaryEntryEntity })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDiaryEntryDto: UpdateDiaryEntryDto,
  ) {
    return this.diaryEntryService.update(req.user.userId, id, updateDiaryEntryDto);
  }

  @Delete('diary-entries/:id')
  @ApiOperation({ summary: 'Delete a diary entry' })
  @ApiOkResponse({ description: 'The deleted diary entry', type: DiaryEntryEntity })
  remove(@Request() req, @Param('id') id: string) {
    return this.diaryEntryService.remove(req.user.userId, id);
  }
}
