import { Body, Controller, Get, Res, UsePipes, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { FastifyReply } from 'fastify';
import { AuthDataService } from './auth.data.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authDataService: AuthDataService) {}

  @Post('sign-up')
  async register(@Body() body: RegisterDto, @Res() res: FastifyReply) {

    const user = await this.authDataService.register(body)
    // const session = await this.authDataService.createSession(user.id, res)
    
  }
}