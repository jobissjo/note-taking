import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service.js';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findOne(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.create({
      email: registerDto.email,
      password: hashedPassword,
      name: registerDto.name,
    });

    const { password, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOne(loginDto.email);
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        hasPin: !!user.pin,
      },
    };
  }

  async googleLogin(req: any) {
    if (!req.user) {
      throw new UnauthorizedException('No user from google');
    }

    const { email, name, googleId } = req.user;
    let user = await this.usersService.findOne(email);

    if (!user) {
      // Create new user if they don't exist
      user = await this.usersService.create({
        email,
        name,
        googleId,
      } as any);
    } else if (!user?.googleId) {
      // Link existing user with googleId if not linked yet
      user = await this.usersService.update(email, { googleId } as any);
    }

    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        hasPin: !!user.pin,
      },
    };
  }

  async setPin(userId: string, pin: string) {
    const hashedPin = await bcrypt.hash(pin, 10);
    await this.usersService.updateById(userId, { pin: hashedPin });
    return { message: 'PIN set successfully' };
  }

  async verifyPin(userId: string, pin: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.pin) {
      throw new UnauthorizedException('PIN not set');
    }

    const isPinValid = await bcrypt.compare(pin, user.pin);
    if (!isPinValid) {
      throw new UnauthorizedException('Invalid PIN');
    }

    return { success: true };
  }
}
