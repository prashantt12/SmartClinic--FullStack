import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import cookie from '@fastify/cookie';
import { ZodValidationPipe } from 'nestjs-zod';
  
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(cookie, {secret: process.env.COOKIE_SECRET});
  app.enableCors({
    origin: true,
    credentials: true,
  })
  app.useGlobalPipes(new ZodValidationPipe())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
