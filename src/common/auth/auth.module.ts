import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthDataService } from './auth.data.service';
@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthDataService],
  imports: [PrismaModule]
})
export class AuthModule {}
