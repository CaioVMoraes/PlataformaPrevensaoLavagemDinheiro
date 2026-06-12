import { AuditService } from '../audit/audit.service';
import { AlertView } from './alert.presenter';
import { AlertRepository } from './alert.repository';
import { UpdateAlertStatusDto } from './dto/update-alert-status.dto';
export declare class AlertService {
    private readonly alertRepository;
    private readonly auditService;
    constructor(alertRepository: AlertRepository, auditService: AuditService);
    listAlerts(): AlertView[];
    getAlert(alertId: string): AlertView;
    updateStatus(alertId: string, input: UpdateAlertStatusDto): AlertView;
}
