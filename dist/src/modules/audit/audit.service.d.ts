import { AuditEventType } from '../../shared/domain/audit-event-type';
import { AuditLog } from '../../shared/database/mock-data';
import { AuditRepository } from './audit.repository';
export interface RegisterAuditInput {
    user: string;
    action: AuditEventType;
    resource: string;
    result: 'SUCCESS' | 'ERROR';
    metadata?: Record<string, string>;
}
export declare class AuditService {
    private readonly auditRepository;
    constructor(auditRepository: AuditRepository);
    listAuditLogs(): AuditLog[];
    register(input: RegisterAuditInput): AuditLog;
}
