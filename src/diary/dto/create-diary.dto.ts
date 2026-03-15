import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDiaryDto {
  @ApiProperty({ example: 'My 2026 Journey' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Personal reflection and gratitude', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
