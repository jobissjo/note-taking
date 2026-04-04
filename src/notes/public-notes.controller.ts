import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NotesService } from './notes.service.js';
import { NoteEntity } from './dto/note.entity.js';

@ApiTags('public-notes')
@Controller('public/notes')
export class PublicNotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  @ApiOperation({ summary: 'List all published notes from public workspaces' })
  @ApiQuery({ name: 'workspaceId', required: false })
  @ApiQuery({ name: 'notebookId', required: false })
  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiOkResponse({ description: 'List of public notes', type: NoteEntity, isArray: true })
  findAll(
    @Query('workspaceId') workspaceId?: string,
    @Query('notebookId') notebookId?: string,
    @Query('take') take?: string,
    @Query('skip') skip?: string,
  ) {
    return this.notesService.findAllPublic({
      workspaceId,
      notebookId,
      take: take ? Number(take) : undefined,
      skip: skip ? Number(skip) : undefined,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a published note by ID from a public workspace' })
  @ApiOkResponse({ description: 'The public note details', type: NoteEntity })
  findOne(@Param('id') id: string) {
    return this.notesService.findOnePublic(id);
  }
}
