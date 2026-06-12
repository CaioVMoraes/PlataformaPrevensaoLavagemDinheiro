import { Injectable } from '@nestjs/common';
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

@Injectable()
export class AuditService {
  constructor(private readonly auditRepository: AuditRepository) {}

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
