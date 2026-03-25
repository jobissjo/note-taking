import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateWorkspaceDto } from './dto/create-workspace.dto.js';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto.js';

@Injectable()
export class WorkspaceService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createWorkspaceDto: CreateWorkspaceDto) {
    return this.prisma.workspace.create({
      data: {
        ...createWorkspaceDto,
        ownerId: userId,
      },
    });
  }

  async findAll(userId: string, showHidden: boolean = false) {
    return this.prisma.workspace.findMany({
      where: {
        ownerId: userId,
        isHidden: showHidden ? true : false,
      },
    });
  }

  async findOne(userId: string, id: string) {
    const workspace = await this.prisma.workspace.findUnique({
      where: { id },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with ID ${id} not found`);
    }

    if (workspace.ownerId !== userId) {
      throw new ForbiddenException('You do not have permission to access this workspace');
    }

    return workspace;
  }

  async update(userId: string, id: string, updateWorkspaceDto: UpdateWorkspaceDto) {
    await this.findOne(userId, id); // Reuse ownership check

    return this.prisma.workspace.update({
      where: { id },
      data: updateWorkspaceDto,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id); // Reuse ownership check

    return this.prisma.workspace.delete({
      where: { id },
    });
  }
}
