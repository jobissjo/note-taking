import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { NotesService } from './notes.service.js';
import { CreateNoteDto } from './dto/create-note.dto.js';
import { UpdateNoteDto } from './dto/update-note.dto.js';
import { NoteEntity } from './dto/note.entity.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@ApiTags('notes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('notebooks/:notebookId/notes')
  @ApiOperation({ summary: 'Create a new note inside a notebook' })
  @ApiCreatedResponse({ description: 'Note successfully created', type: NoteEntity })
  create(
    @Request() req,
    @Param('notebookId') notebookId: string,
    @Body() createNoteDto: CreateNoteDto,
  ) {
    return this.notesService.create(req.user.userId, notebookId, createNoteDto);
  }

  @Get('notebooks/:notebookId/notes')
  @ApiOperation({ summary: 'List all notes in a notebook' })
  @ApiOkResponse({ description: 'List of notes', type: NoteEntity, isArray: true })
  findAll(@Request() req, @Param('notebookId') notebookId: string) {
    return this.notesService.findAll(req.user.userId, notebookId);
  }

  @Get('notes/:id')
  @ApiOperation({ summary: 'Get a specific note by ID' })
  @ApiOkResponse({ description: 'The note details', type: NoteEntity })
  findOne(@Request() req, @Param('id') id: string) {
    return this.notesService.findOne(req.user.userId, id);
  }

  @Patch('notes/:id')
  @ApiOperation({ summary: 'Update a note' })
  @ApiOkResponse({ description: 'The updated note', type: NoteEntity })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.update(req.user.userId, id, updateNoteDto);
  }

  @Delete('notes/:id')
  @ApiOperation({ summary: 'Delete a note' })
  @ApiOkResponse({ description: 'The deleted note', type: NoteEntity })
  remove(@Request() req, @Param('id') id: string) {
    return this.notesService.remove(req.user.userId, id);
  }
}
