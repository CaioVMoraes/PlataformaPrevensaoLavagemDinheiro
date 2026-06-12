import { Injectable } from '@nestjs/common';
import { AuditEventType } from '../../shared/domain/audit-event-type';
import { AuditService } from '../audit/audit.service';
import { InvestigationService } from '../investigations/investigation.service';
import { ReportView } from './report-view';

@Injectable()
export class ReportService {
  constructor(
    private readonly investigationService: InvestigationService,
    private readonly auditService: AuditService,
  ) {}

  generateReport(investigationId: string): ReportView {
    const investigation = this.investigationService.getInvestigation(investigationId);
    const status = investigation.reportReviewed ? 'READY_FOR_APPROVAL' : 'DRAFT';

    this.auditService.register({
      user: 'local-api',
      action: AuditEventType.REPORT_GENERATED,
      resource: investigationId,
      result: 'SUCCESS',
      metadata: {
        reportStatus: status,
      },
    });

    return {
      id: `RPT-${investigation.id.replace('INV-', '')}`,
      investigationId: investigation.id,
      generatedAt: new Date().toISOString(),
      status,
      reviewed: investigation.reportReviewed,
      caseStatus: investigation.status,
      suggestedRisk: investigation.suggestedRisk,
      canProceedToRegulatoryEvaluation: investigation.canProceedToRegulatoryEvaluation,
      summary:
        `Relatorio mockado para ${investigation.id}. ` +
        `O alerta ${investigation.alert.id} foi classificado como ${investigation.alert.riskClassification}.`,
      evidences: investigation.evidences,
      analystConclusion: investigation.conclusion,
    };
  }
}
