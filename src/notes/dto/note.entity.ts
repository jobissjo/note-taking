import { ApiProperty } from '@nestjs/swagger';

export class NoteEntity {
  @ApiProperty({ example: 'uuid-999' })
  id: string;

  @ApiProperty({ example: 'My First Note' })
  title: string;

  @ApiProperty({ example: { type: 'doc', content: [] } })
  content: any;

  @ApiProperty({ example: 'uuid-789' })
  notebookId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
