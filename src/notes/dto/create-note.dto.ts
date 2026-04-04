import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
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

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
