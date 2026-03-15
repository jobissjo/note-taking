import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateDiaryDto } from './dto/create-diary.dto.js';
import { UpdateDiaryDto } from './dto/update-diary.dto.js';

@Injectable()
export class DiaryService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createDiaryDto: CreateDiaryDto) {
    return this.prisma.diary.create({
      data: {
        ...createDiaryDto,
        ownerId: userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.diary.findMany({
      where: { ownerId: userId },
    });
  }

  async findOne(userId: string, id: string) {
    const diary = await this.prisma.diary.findUnique({
      where: { id },
    });

    if (!diary) {
      throw new NotFoundException(`Diary with ID ${id} not found`);
    }

    if (diary.ownerId !== userId) {
      throw new ForbiddenException('You do not have permission to access this diary');
    }

    return diary;
  }

  async update(userId: string, id: string, updateDiaryDto: UpdateDiaryDto) {
    await this.findOne(userId, id); // Reuse ownership check

    return this.prisma.diary.update({
      where: { id },
      data: updateDiaryDto,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id); // Reuse ownership check

    return this.prisma.diary.delete({
      where: { id },
    });
  }
}
