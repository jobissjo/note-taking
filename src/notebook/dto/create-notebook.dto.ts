import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotebookDto {
  @ApiProperty({ example: 'Personal Notes' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
