import { ApiProperty } from '@nestjs/swagger';

export class DiaryEntity {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({ example: 'My 2026 Journey' })
  name: string;

  @ApiProperty({ example: 'Personal reflection', required: false })
  description: string;

  @ApiProperty({ example: 'uuid-456' })
  ownerId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ example: false })
  isLocked: boolean;

  @ApiProperty({ example: false })
  isHidden: boolean;
}
