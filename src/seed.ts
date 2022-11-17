import { NestFactory } from '@nestjs/core';
import { SeederService } from './seeder/seeder.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seederService = app.get(SeederService);
  await seederService.seed();
  console.log('finish seeding.');
  process.exit(0);
}

bootstrap();
