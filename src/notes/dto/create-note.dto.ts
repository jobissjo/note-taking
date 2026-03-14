import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({ example: 'My First Note' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: { type: 'doc', content: [] } })
  @IsObject()
  @IsNotEmpty()
  content: any;
}
