import { Module } from '@nestjs/common';
import { AuditModule } from '../audit/audit.module';
import { InvestigationsModule } from '../investigations/investigations.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [InvestigationsModule, AuditModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportsModule {}
