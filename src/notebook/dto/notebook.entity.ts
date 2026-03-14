import { ApiProperty } from '@nestjs/swagger';

export class NotebookEntity {
  @ApiProperty({ example: 'uuid-789' })
  id: string;

  @ApiProperty({ example: 'Personal Notes' })
  name: string;

  @ApiProperty({ example: 'uuid-456' })
  workspaceId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
