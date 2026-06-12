import { Injectable } from '@nestjs/common';
import { AuditEventType } from '../../shared/domain/audit-event-type';
import { AuditLog, mockedAuditLogs } from '../../shared/database/mock-data';

export interface CreateAuditLogInput {
  user: string;
  action: AuditEventType;
  resource: string;
  result: 'SUCCESS' | 'ERROR';
  metadata: Record<string, string>;
}

@Injectable()
export class AuditRepository {
  private readonly auditLogs: AuditLog[] = [...mockedAuditLogs];

  findAll(): AuditLog[] {
    return [...this.auditLogs].sort((current, next) =>
      next.occurredAt.localeCompare(current.occurredAt),
    );
  }

  create(input: CreateAuditLogInput): AuditLog {
    const auditLog: AuditLog = {
      id: `AUD-${3000 + this.auditLogs.length + 1}`,
      occurredAt: new Date().toISOString(),
      ...input,
    };

    this.auditLogs.push(auditLog);

    return auditLog;
  }
}
