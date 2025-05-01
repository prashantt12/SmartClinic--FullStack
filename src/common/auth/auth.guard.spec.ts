import { AuthGuard } from './auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AuthGuard', () => {
  it('should be defined', () => {
    const prismaService = {} as PrismaService;
    expect(new AuthGuard(prismaService)).toBeDefined();
  });
});
