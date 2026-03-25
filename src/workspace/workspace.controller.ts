import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { WorkspaceService } from './workspace.service.js';
import { CreateWorkspaceDto } from './dto/create-workspace.dto.js';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto.js';
import { WorkspaceEntity } from './dto/workspace.entity.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { AuthService } from '../auth/auth.service.js';

@ApiTags('workspaces')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('workspaces')
export class WorkspaceController {
  constructor(
    private readonly workspaceService: WorkspaceService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workspace' })
  @ApiCreatedResponse({ description: 'Workspace successfully created', type: WorkspaceEntity })
  create(@Request() req, @Body() createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspaceService.create(req.user.userId, createWorkspaceDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all workspaces for the authenticated user' })
  @ApiQuery({ name: 'pin', required: false, description: 'User settings PIN to see hidden items' })
  @ApiOkResponse({ description: 'List of workspaces', type: WorkspaceEntity, isArray: true })
  async findAll(@Request() req, @Query('pin') pin?: string) {
    if (pin) {
      await this.authService.verifyPin(req.user.userId, pin);
      return this.workspaceService.findAll(req.user.userId, true);
    }
    return this.workspaceService.findAll(req.user.userId, false);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific workspace by ID' })
  @ApiOkResponse({ description: 'The workspace details', type: WorkspaceEntity })
  findOne(@Request() req, @Param('id') id: string) {
    return this.workspaceService.findOne(req.user.userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a workspace' })
  @ApiOkResponse({ description: 'The updated workspace', type: WorkspaceEntity })
  update(@Request() req, @Param('id') id: string, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspaceService.update(req.user.userId, id, updateWorkspaceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a workspace' })
  @ApiOkResponse({ description: 'The deleted workspace', type: WorkspaceEntity })
  remove(@Request() req, @Param('id') id: string) {
    return this.workspaceService.remove(req.user.userId, id);
  }
}
