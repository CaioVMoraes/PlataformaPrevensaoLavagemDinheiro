import { AlertRepository } from '../alerts/alert.repository';
import { AuditService } from '../audit/audit.service';
import { CloseInvestigationDto } from './dto/close-investigation.dto';
import { InvestigationView } from './investigation.presenter';
import { InvestigationRepository } from './investigation.repository';
export declare class InvestigationService {
    private readonly investigationRepository;
    private readonly alertRepository;
    private readonly auditService;
    constructor(investigationRepository: InvestigationRepository, alertRepository: AlertRepository, auditService: AuditService);
    listInvestigations(): InvestigationView[];
    getInvestigation(investigationId: string): InvestigationView;
    closeInvestigation(investigationId: string, input: CloseInvestigationDto): InvestigationView;
    private findInvestigationOrThrow;
    private toInvestigationView;
    private assertCanCloseInvestigation;
}
