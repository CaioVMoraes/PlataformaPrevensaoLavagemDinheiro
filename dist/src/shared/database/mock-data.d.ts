import { Alert } from '../domain/alert';
import { AuditEventType } from '../domain/audit-event-type';
import { Investigation } from '../domain/investigation';
export interface AuditLog {
    id: string;
    user: string;
    action: AuditEventType;
    resource: string;
    result: 'SUCCESS' | 'ERROR';
    occurredAt: string;
    metadata: Record<string, string>;
}
export declare const mockedAlerts: Alert[];
export declare const mockedInvestigations: Investigation[];
export declare const mockedAuditLogs: AuditLog[];
