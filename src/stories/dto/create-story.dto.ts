import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsObject, IsOptional } from 'class-validator';

export class CreateStoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'My Story Title' })
  title: string;

  @IsNotEmpty()
  @IsObject()
  @ApiProperty({ example: { type: 'doc', content: [] } })
  content: any;
}
