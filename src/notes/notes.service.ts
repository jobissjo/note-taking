import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { NotebookService } from '../notebook/notebook.service.js';
import { CreateNoteDto } from './dto/create-note.dto.js';
import { UpdateNoteDto } from './dto/update-note.dto.js';

@Injectable()
export class NotesService {
  constructor(
    private prisma: PrismaService,
    private notebookService: NotebookService,
  ) {}

  async create(userId: string, notebookId: string, createNoteDto: CreateNoteDto) {
    // Validate notebook exists and belongs to the user (via workspace hierarchy)
    await this.notebookService.findOne(userId, notebookId);

    return this.prisma.note.create({
      data: {
        ...createNoteDto,
        notebookId,
      },
    });
  }

  async findAll(userId: string, notebookId: string) {
    // Validate notebook exists and belongs to the user
    await this.notebookService.findOne(userId, notebookId);

    return this.prisma.note.findMany({
      where: { notebookId },
    });
  }

  async findOne(userId: string, id: string) {
    const note = await this.prisma.note.findUnique({
      where: { id },
      include: {
        notebook: {
          include: {
            workspace: true,
          },
        },
      },
    });

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    if (note.notebook.workspace.ownerId !== userId) {
      throw new ForbiddenException('You do not have permission to access this note');
    }

    return note;
  }

  async update(userId: string, id: string, updateNoteDto: UpdateNoteDto) {
    await this.findOne(userId, id); // Reuse ownership check

    return this.prisma.note.update({
      where: { id },
      data: updateNoteDto,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id); // Reuse ownership check

    return this.prisma.note.delete({
      where: { id },
    });
  }
}
