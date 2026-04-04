import { IsNotEmpty, IsObject, IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDiaryEntryDto {
  @ApiProperty({ example: '2026-03-15' })
  @IsDateString()
  @IsNotEmpty()
  date: string; // Storing as ISO Date string like YYYY-MM-DD for Prisma @db.Date mapping

  @ApiProperty({ example: 'A wonderful day', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: { type: 'doc', content: [] } })
  @IsObject()
  @IsNotEmpty()
  content: any;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  isPublished?: boolean;
}
