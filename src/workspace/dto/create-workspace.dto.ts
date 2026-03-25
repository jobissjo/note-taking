import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkspaceDto {
  @ApiProperty({ example: 'Self Learning' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Workspace for programming and personal projects', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  isLocked?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  isHidden?: boolean;
}
