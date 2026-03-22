import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class SetPinDto {
  @ApiProperty({ description: 'The 4 or more digit PIN to set' })
  @IsString()
  @MinLength(4)
  @MaxLength(6)
  pin: string;
}
