import { Body, Controller, Get, Res, UsePipes, Post, Query, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { FastifyReply } from 'fastify';
import { AuthDataService } from './auth.data.service';
import { User } from 'generated/prisma';
import { request } from 'http';
@Controller('auth')
export class AuthController {
  constructor(private readonly authDataService: AuthDataService) {}

  @Post('init-admin')
  async initAdmin(@Body() body: RegisterDto) {
    if(process.env.ALLOW_ADMIN_INIT != 'true') {
      return new Error('Admin initialization is not allowed');
    }
    const adminExists = await this.authDataService.checkAdminExists(body);
    return {data:adminExists, message: 'Admin initialization successful'};

  }

  @Post('sign-up')
  async register(@Body() body: RegisterDto) {
    const user = await this.authDataService.register(body)
    return { data: user, message: 'User created successfully' };
  }
}