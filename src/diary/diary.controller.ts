import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { DiaryService } from './diary.service.js';
import { CreateDiaryDto } from './dto/create-diary.dto.js';
import { UpdateDiaryDto } from './dto/update-diary.dto.js';
import { DiaryEntity } from './dto/diary.entity.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@ApiTags('diaries')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('diaries')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new diary' })
  @ApiCreatedResponse({ description: 'Diary successfully created', type: DiaryEntity })
  create(@Request() req, @Body() createDiaryDto: CreateDiaryDto) {
    return this.diaryService.create(req.user.userId, createDiaryDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all diaries for the authenticated user' })
  @ApiOkResponse({ description: 'List of diaries', type: DiaryEntity, isArray: true })
  findAll(@Request() req) {
    return this.diaryService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific diary by ID' })
  @ApiOkResponse({ description: 'The diary details', type: DiaryEntity })
  findOne(@Request() req, @Param('id') id: string) {
    return this.diaryService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a diary' })
  @ApiOkResponse({ description: 'The updated diary', type: DiaryEntity })
  update(@Request() req, @Param('id') id: string, @Body() updateDiaryDto: UpdateDiaryDto) {
    return this.diaryService.update(req.user.userId, id, updateDiaryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a diary' })
  @ApiOkResponse({ description: 'The deleted diary', type: DiaryEntity })
  remove(@Request() req, @Param('id') id: string) {
    return this.diaryService.remove(req.user.userId, id);
  }
}
