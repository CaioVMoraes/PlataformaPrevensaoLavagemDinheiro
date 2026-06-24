import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { InvestigationsMicroserviceModule } from './investigations-microservice.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    InvestigationsMicroserviceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 4001,
      },
    },
  );

  // Starts the dedicated investigations microservice process.
  await app.listen();
}

void bootstrap();