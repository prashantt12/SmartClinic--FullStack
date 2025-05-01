import { Body, Controller, Get, Res, UsePipes, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import { FastifyReply } from 'fastify';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto, @Res() res: FastifyReply) {

    // const user = await this.authService.register(body)
    // const session = await this.authService.createSession(user.id, res)
    
  }
}
