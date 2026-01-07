import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { enviromentsVars } from './config';
import { GlobalRpcExceptionFilter } from './common/exceptions/rpc-exception.filters';

async function main() {
  const logger = new Logger('Gateway');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new GlobalRpcExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(enviromentsVars.port ?? 3000);
  logger.log(`Gateway is running on port ${enviromentsVars.port}`);
}
main();
