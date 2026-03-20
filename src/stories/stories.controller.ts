import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { StoriesService } from './stories.service.js';
import { CreateStoryDto } from './dto/create-story.dto.js';
import { UpdateStoryDto } from './dto/update-story.dto.js';
import { StoryEntity } from './dto/story.entity.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@ApiTags('stories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new story' })
  @ApiCreatedResponse({ description: 'Story successfully created', type: StoryEntity })
  create(@Request() req, @Body() createStoryDto: CreateStoryDto) {
    return this.storiesService.create(req.user.userId, createStoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all stories of the current user' })
  @ApiOkResponse({ description: 'List of stories', type: StoryEntity, isArray: true })
  findAll(@Request() req) {
    return this.storiesService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific story by ID' })
  @ApiOkResponse({ description: 'The story details', type: StoryEntity })
  findOne(@Request() req, @Param('id') id: string) {
    return this.storiesService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a story' })
  @ApiOkResponse({ description: 'The updated story', type: StoryEntity })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateStoryDto: UpdateStoryDto,
  ) {
    return this.storiesService.update(req.user.userId, id, updateStoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a story' })
  @ApiOkResponse({ description: 'The deleted story', type: StoryEntity })
  remove(@Request() req, @Param('id') id: string) {
    return this.storiesService.remove(req.user.userId, id);
  }
}
