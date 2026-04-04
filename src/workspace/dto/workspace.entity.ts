import { ApiProperty } from '@nestjs/swagger';

export class WorkspaceEntity {
  @ApiProperty({ example: 'uuid-456' })
  id: string;

  @ApiProperty({ example: 'Self Learning' })
  name: string;

  @ApiProperty({ example: 'Workspace for programming', required: false })
  description: string;

  @ApiProperty({ example: 'uuid-123' })
  ownerId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ example: false })
  isLocked: boolean;

  @ApiProperty({ example: false })
  isHidden: boolean;

  @ApiProperty({ example: false })
  isPublic: boolean;
}
