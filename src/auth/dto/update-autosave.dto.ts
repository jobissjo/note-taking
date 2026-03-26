import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateAutoSaveDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  enabled: boolean;
}
