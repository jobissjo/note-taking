import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateStoryDto } from './dto/create-story.dto.js';
import { UpdateStoryDto } from './dto/update-story.dto.js';

@Injectable()
export class StoriesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createStoryDto: CreateStoryDto) {
    return this.prisma.story.create({
      data: {
        ...createStoryDto,
        createdById: userId,
      },
    });
  }

  async findAll(userId: string, showHidden: boolean = false) {
    return this.prisma.story.findMany({
      where: {
        createdById: userId,
        isHidden: showHidden ? true : false,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const story = await this.prisma.story.findUnique({
      where: { id },
    });

    if (!story) {
      throw new NotFoundException(`Story with ID ${id} not found`);
    }

    if (story.createdById !== userId) {
      throw new ForbiddenException('You do not have permission to access this story');
    }

    return story;
  }

  async update(userId: string, id: string, updateStoryDto: UpdateStoryDto) {
    await this.findOne(userId, id); // Reuse ownership check

    return this.prisma.story.update({
      where: { id },
      data: updateStoryDto,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id); // Reuse ownership check

    return this.prisma.story.delete({
      where: { id },
    });
  }

  async findAllPublic(params?: { take?: number; skip?: number }) {
    return this.prisma.story.findMany({
      where: {
        isPublic: true,
        isPublished: true,
        isHidden: false,
        isLocked: false,
      },
      orderBy: { updatedAt: 'desc' },
      take: params?.take,
      skip: params?.skip,
    });
  }

  async findOnePublic(id: string) {
    const story = await this.prisma.story.findFirst({
      where: {
        id,
        isPublic: true,
        isPublished: true,
        isHidden: false,
        isLocked: false,
      },
    });

    if (!story) {
      throw new NotFoundException(`Story with ID ${id} not found`);
    }

    return story;
  }
}
