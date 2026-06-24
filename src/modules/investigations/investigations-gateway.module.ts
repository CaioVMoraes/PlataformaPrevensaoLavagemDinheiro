import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  INVESTIGATIONS_CLIENT_TOKEN,
  InvestigationClientService,
} from './investigation.client.service';
import { InvestigationController } from './investigation.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: INVESTIGATIONS_CLIENT_TOKEN,
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4001,
        },
      },
    ]),
  ],
  controllers: [InvestigationController],
  providers: [InvestigationClientService],
})
export class InvestigationsGatewayModule {}