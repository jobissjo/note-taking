import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyPinDto {
  @ApiProperty({ description: 'The PIN to verify' })
  @IsString()
  pin: string;
}
