import { ApiProperty } from '@nestjs/swagger';

export class DiaryEntryEntity {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({ example: 'A wonderful day', required: false })
  title: string;

  @ApiProperty({ example: { type: 'doc', content: [] } })
  content: any;

  @ApiProperty({ example: '2026-03-15' })
  date: Date;

  @ApiProperty({ example: 'uuid-456' })
  diaryId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ example: false })
  isPublished: boolean;
}
