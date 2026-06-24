import { Inject, Injectable } from '@nestjs/common';
import { AuditEventType } from '../../shared/domain/audit-event-type';
import { AuditLog } from '../../shared/database/mock-data';
import { AUDIT_REPOSITORY_TOKEN, IAuditRepository } from './audit.repository.interface';

export interface RegisterAuditInput {
  user: string;
  action: AuditEventType;
  resource: string;
  result: 'SUCCESS' | 'ERROR';
  metadata?: Record<string, string>;
}

@Injectable()
export class AuditService {
  constructor(
    @Inject(AUDIT_REPOSITORY_TOKEN)
    private readonly auditRepository: IAuditRepository,
  ) {}

  listAuditLogs(): AuditLog[] {
    return this.auditRepository.findAll();
  }

  register(input: RegisterAuditInput): AuditLog {
    return this.auditRepository.create({
      ...input,
      metadata: input.metadata ?? {},
    });
  }
}
