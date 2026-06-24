import { AuditEventType } from '../../shared/domain/audit-event-type';
import { AuditLog } from '../../shared/database/mock-data';

export interface CreateAuditLogInput {
  user: string;
  action: AuditEventType;
  resource: string;
  result: 'SUCCESS' | 'ERROR';
  metadata: Record<string, string>;
}

export interface IAuditRepository {
  findAll(): AuditLog[];
  create(input: CreateAuditLogInput): AuditLog;
}

export const AUDIT_REPOSITORY_TOKEN = Symbol('AUDIT_REPOSITORY_TOKEN');
