import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { NotebookService } from './notebook.service.js';
import { CreateNotebookDto } from './dto/create-notebook.dto.js';
import { UpdateNotebookDto } from './dto/update-notebook.dto.js';
import { NotebookEntity } from './dto/notebook.entity.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@ApiTags('notebooks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class NotebookController {
  constructor(private readonly notebookService: NotebookService) {}

  @Post('workspaces/:workspaceId/notebooks')
  @ApiOperation({ summary: 'Create a new notebook inside a workspace' })
  @ApiCreatedResponse({ description: 'Notebook successfully created', type: NotebookEntity })
  create(
    @Request() req,
    @Param('workspaceId') workspaceId: string,
    @Body() createNotebookDto: CreateNotebookDto,
  ) {
    return this.notebookService.create(req.user.userId, workspaceId, createNotebookDto);
  }

  @Get('workspaces/:workspaceId/notebooks')
  @ApiOperation({ summary: 'List all notebooks in a workspace' })
  @ApiOkResponse({ description: 'List of notebooks', type: NotebookEntity, isArray: true })
  findAll(@Request() req, @Param('workspaceId') workspaceId: string) {
    return this.notebookService.findAll(req.user.userId, workspaceId);
  }

  @Patch('notebooks/:id')
  @ApiOperation({ summary: 'Update a notebook' })
  @ApiOkResponse({ description: 'The updated notebook', type: NotebookEntity })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateNotebookDto: UpdateNotebookDto,
  ) {
    return this.notebookService.update(req.user.userId, id, updateNotebookDto);
  }

  @Delete('notebooks/:id')
  @ApiOperation({ summary: 'Delete a notebook' })
  @ApiOkResponse({ description: 'The deleted notebook', type: NotebookEntity })
  remove(@Request() req, @Param('id') id: string) {
    return this.notebookService.remove(req.user.userId, id);
  }
}
