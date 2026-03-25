import { ApiProperty } from '@nestjs/swagger';

export class StoryEntity {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({ example: 'My Awesome Story' })
  title: string;

  @ApiProperty({ example: { type: 'doc', content: [] } })
  content: any;

  @ApiProperty({ example: 'uuid-user-456' })
  createdById: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ example: false })
  isLocked: boolean;

  @ApiProperty({ example: false })
  isHidden: boolean;
}
