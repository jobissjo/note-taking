import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

export interface DashboardStats {
  workspaces: number;
  journals: number;
  stories: number;
}

export interface DashboardRecentItem {
  id: string;
  type: 'note' | 'journal' | 'story';
  title: string;
  updatedAt: string;
  metadata?: {
    workspaceId?: string;
    notebookId?: string;
    diaryId?: string;
  };
}

export interface DashboardSummary {
  stats: DashboardStats;
  recentActivity: DashboardRecentItem[];
}

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboardData(userId: string): Promise<DashboardSummary> {
    // 1. Get stats
    const [workspaceCount, journalCount, storyCount] = await Promise.all([
      this.prisma.workspace.count({ where: { ownerId: userId } }),
      this.prisma.diary.count({ where: { ownerId: userId } }),
      this.prisma.story.count({ where: { createdById: userId } }),
    ]);

    // 2. Fetch recent notes
    const recentNotes = await this.prisma.note.findMany({
      where: {
        notebook: {
          workspace: {
            ownerId: userId,
          },
        },
      },
      take: 5,
      orderBy: { updatedAt: 'desc' },
      include: {
        notebook: {
          select: {
            id: true,
            workspaceId: true,
          },
        },
      },
    });

    // 3. Fetch recent diary entries (journals)
    const recentDiaryEntries = await this.prisma.diaryEntry.findMany({
      where: {
        diary: {
          ownerId: userId,
        },
      },
      take: 5,
      orderBy: { updatedAt: 'desc' },
      include: {
        diary: {
          select: {
            id: true,
          },
        },
      },
    });

    // 4. Fetch recent stories
    const recentStories = await this.prisma.story.findMany({
      where: {
        createdById: userId,
      },
      take: 5,
      orderBy: { updatedAt: 'desc' },
    });

    // 5. Combine and transform to DashboardRecentItem
    const combinedActivity: DashboardRecentItem[] = [
      ...recentNotes.map((note) => ({
        id: note.id,
        type: 'note' as const,
        title: note.title,
        updatedAt: note.updatedAt.toISOString(),
        metadata: {
          workspaceId: note.notebook.workspaceId,
          notebookId: note.notebook.id,
        },
      })),
      ...recentDiaryEntries.map((entry) => ({
        id: entry.id,
        type: 'journal' as const,
        title: entry.title || 'Untitled Entry',
        updatedAt: entry.updatedAt.toISOString(),
        metadata: {
          diaryId: entry.diary.id,
        },
      })),
      ...recentStories.map((story) => ({
        id: story.id,
        type: 'story' as const,
        title: story.title,
        updatedAt: story.updatedAt.toISOString(),
      })),
    ];

    // 6. Sort and slice
    const sortedRecentActivity = combinedActivity
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5); // Take top 5 or 10

    return {
      stats: {
        workspaces: workspaceCount,
        journals: journalCount,
        stories: storyCount,
      },
      recentActivity: sortedRecentActivity,
    };
  }
}
