import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const sessionId = request.cookies?.['sid'];

    if (!sessionId) throw new UnauthorizedException();

    const session = await this.prisma.session.findUnique({
      where: {
        id: sessionId,
      },
        include: {
          user: true,
        }
    });

    if (!session || session.expiresAt && new Date() > session.expiresAt) {
      throw new UnauthorizedException("Session expired or Invalid session");
    }

    request.user = session.user;
    
    return true;
  }
}
