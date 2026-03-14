import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { WorkspaceService } from './workspace.service.js';
import { CreateWorkspaceDto } from './dto/create-workspace.dto.js';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@ApiTags('workspaces')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workspace' })
  @ApiResponse({ status: 21, description: 'Workspace successfully created' })
  create(@Request() req, @Body() createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspaceService.create(req.user.userId, createWorkspaceDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all workspaces for the authenticated user' })
  findAll(@Request() req) {
    return this.workspaceService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific workspace by ID' })
  findOne(@Request() req, @Param('id') id: string) {
    return this.workspaceService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a workspace' })
  update(@Request() req, @Param('id') id: string, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspaceService.update(req.user.userId, id, updateWorkspaceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a workspace' })
  remove(@Request() req, @Param('id') id: string) {
    return this.workspaceService.remove(req.user.userId, id);
  }
}
