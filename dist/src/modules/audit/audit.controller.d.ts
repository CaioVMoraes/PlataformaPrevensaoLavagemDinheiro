import { AuditLog } from '../../shared/database/mock-data';
import { ApiSuccessResponse } from '../../shared/http/api-response';
import { AuditService } from './audit.service';
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditService);
    listAuditLogs(): ApiSuccessResponse<AuditLog[]>;
}
