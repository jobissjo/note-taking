import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StoriesService } from './stories.service.js';
import { StoryEntity } from './dto/story.entity.js';

@ApiTags('public-stories')
@Controller('public/stories')
export class PublicStoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Get()
  @ApiOperation({ summary: 'List all public, published stories' })
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiOkResponse({ description: 'List of public stories', type: StoryEntity, isArray: true })
  findAll(@Query('take') take?: string, @Query('skip') skip?: string) {
    return this.storiesService.findAllPublic({
      take: take ? Number(take) : undefined,
      skip: skip ? Number(skip) : undefined,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a public, published story by ID' })
  @ApiOkResponse({ description: 'The public story details', type: StoryEntity })
  findOne(@Param('id') id: string) {
    return this.storiesService.findOnePublic(id);
  }
}
