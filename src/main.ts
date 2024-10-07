import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './prisma-exception.filter';
// import { AuthMiddleware } from './middlewares/auth.middleware';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  // app.use(new AuthMiddleware().use);
  await app.listen(3000);
}
bootstrap();
