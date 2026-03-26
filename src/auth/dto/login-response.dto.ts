import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ example: true })
  hasPin: boolean;

  @ApiProperty({ example: true })
  autoSaveEnabled: boolean;
}

export class LoginResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1Ni...' })
  accessToken: string;

  @ApiProperty({ type: UserEntity })
  user: UserEntity;
}
