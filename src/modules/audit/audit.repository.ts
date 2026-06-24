import { Injectable } from '@nestjs/common';
import { AuditLog, mockedAuditLogs } from '../../shared/database/mock-data';
import { CreateAuditLogInput, IAuditRepository } from './audit.repository.interface';

@Injectable()
export class AuditRepository implements IAuditRepository {
  private readonly auditLogs: AuditLog[] = [...mockedAuditLogs];

  findAll(): AuditLog[] {
    return [...this.auditLogs].sort((current, next) =>
      next.occurredAt.localeCompare(current.occurredAt),
    );
  }

  create(input: CreateAuditLogInput): AuditLog {
    const auditLog: AuditLog = {
      id: `AUD-${String(3000 + this.auditLogs.length + 1)}`,
      occurredAt: new Date().toISOString(),
      ...input,
    };

    this.auditLogs.push(auditLog);

    return auditLog;
  }
}
