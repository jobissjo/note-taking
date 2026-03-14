import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { LoginResponseDto, UserEntity } from './dto/login-response.dto.js';
import { AuthService } from './auth.service.js';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({ description: 'User successfully registered', type: UserEntity })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse({ description: 'Return JWT access token', type: LoginResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
