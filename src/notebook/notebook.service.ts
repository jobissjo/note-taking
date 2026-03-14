import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { WorkspaceService } from '../workspace/workspace.service.js';
import { CreateNotebookDto } from './dto/create-notebook.dto.js';
import { UpdateNotebookDto } from './dto/update-notebook.dto.js';

@Injectable()
export class NotebookService {
  constructor(
    private prisma: PrismaService,
    private workspaceService: WorkspaceService,
  ) {}

  async create(userId: string, workspaceId: string, createNotebookDto: CreateNotebookDto) {
    // Validate workspace exists and belongs to the user
    await this.workspaceService.findOne(userId, workspaceId);

    return this.prisma.notebook.create({
      data: {
        ...createNotebookDto,
        workspaceId,
      },
    });
  }

  async findAll(userId: string, workspaceId: string) {
    // Validate workspace exists and belongs to the user
    await this.workspaceService.findOne(userId, workspaceId);

    return this.prisma.notebook.findMany({
      where: { workspaceId },
    });
  }

  async findOne(userId: string, id: string) {
    const notebook = await this.prisma.notebook.findUnique({
      where: { id },
      include: { workspace: true },
    });

    if (!notebook) {
      throw new NotFoundException(`Notebook with ID ${id} not found`);
    }

    if (notebook.workspace.ownerId !== userId) {
      throw new ForbiddenException('You do not have permission to access this notebook');
    }

    return notebook;
  }

  async update(userId: string, id: string, updateNotebookDto: UpdateNotebookDto) {
    await this.findOne(userId, id); // Reuse ownership check

    return this.prisma.notebook.update({
      where: { id },
      data: updateNotebookDto,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id); // Reuse ownership check

    return this.prisma.notebook.delete({
      where: { id },
    });
  }
}
