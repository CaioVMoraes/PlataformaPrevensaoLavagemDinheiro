import { Module } from '@nestjs/common';
import { AlertsModule } from '../alerts/alerts.module';
import { AuditModule } from '../audit/audit.module';
import { InvestigationController } from './investigation.controller';
import { InvestigationRepository } from './investigation.repository';
import { InvestigationService } from './investigation.service';

@Module({
  imports: [AlertsModule, AuditModule],
  controllers: [InvestigationController],
  providers: [InvestigationRepository, InvestigationService],
  exports: [InvestigationRepository, InvestigationService],
})
export class InvestigationsModule {}
