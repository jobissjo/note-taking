import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { DiaryService } from '../diary/diary.service.js';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto.js';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto.js';

@Injectable()
export class DiaryEntryService {
  constructor(
    private prisma: PrismaService,
    private diaryService: DiaryService,
  ) {}

  async create(userId: string, diaryId: string, createDiaryEntryDto: CreateDiaryEntryDto) {
    // Validate diary exists and belongs to the user
    await this.diaryService.findOne(userId, diaryId);

    // Convert date string to JS Date for Prisma
    const data = {
      ...createDiaryEntryDto,
      date: new Date(createDiaryEntryDto.date),
      diaryId
    };

    return this.prisma.diaryEntry.create({
      data,
    });
  }

  async findAll(userId: string, diaryId: string) {
    // Validate diary exists and belongs to the user
    await this.diaryService.findOne(userId, diaryId);

    return this.prisma.diaryEntry.findMany({
      where: { diaryId },
      orderBy: { date: 'desc' }
    });
  }

  async findOne(userId: string, id: string) {
    const entry = await this.prisma.diaryEntry.findUnique({
      where: { id },
      include: {
        diary: true,
      },
    });

    if (!entry) {
      throw new NotFoundException(`Diary entry with ID ${id} not found`);
    }

    if (entry.diary.ownerId !== userId) {
      throw new ForbiddenException('You do not have permission to access this diary entry');
    }

    return entry;
  }

  async update(userId: string, id: string, updateDiaryEntryDto: UpdateDiaryEntryDto) {
    await this.findOne(userId, id); // Reuse ownership check

    const data: any = { ...updateDiaryEntryDto };
    if (updateDiaryEntryDto.date) {
      data.date = new Date(updateDiaryEntryDto.date);
    }

    return this.prisma.diaryEntry.update({
      where: { id },
      data,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id); // Reuse ownership check

    return this.prisma.diaryEntry.delete({
      where: { id },
    });
  }
}
