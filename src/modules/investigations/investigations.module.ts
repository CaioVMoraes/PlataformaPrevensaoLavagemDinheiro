import { Module } from '@nestjs/common';
import { AlertsModule } from '../alerts/alerts.module';
import { AuditModule } from '../audit/audit.module';
import { InvestigationMicroserviceController } from './investigation.microservice.controller';
import { InvestigationRepository } from './investigation.repository';
import { INVESTIGATION_REPOSITORY_TOKEN } from './investigation.repository.interface';
import { InvestigationService } from './investigation.service';

@Module({
  imports: [AlertsModule, AuditModule],
  controllers: [InvestigationMicroserviceController],
  providers: [
    InvestigationService,
    {
      provide: INVESTIGATION_REPOSITORY_TOKEN,
      useClass: InvestigationRepository,
    },
  ],
  exports: [InvestigationService, INVESTIGATION_REPOSITORY_TOKEN],
})
export class InvestigationsModule {}
