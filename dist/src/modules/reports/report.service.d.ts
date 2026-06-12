import { AuditService } from '../audit/audit.service';
import { InvestigationService } from '../investigations/investigation.service';
import { ReportView } from './report-view';
export declare class ReportService {
    private readonly investigationService;
    private readonly auditService;
    constructor(investigationService: InvestigationService, auditService: AuditService);
    generateReport(investigationId: string): ReportView;
}
