import { Module } from '@nestjs/common';
import { AuditController } from './audit.controller';
import { AuditRepository } from './audit.repository';
import { AUDIT_REPOSITORY_TOKEN } from './audit.repository.interface';
import { AuditService } from './audit.service';

@Module({
  controllers: [AuditController],
  providers: [
    AuditService,
    {
      provide: AUDIT_REPOSITORY_TOKEN,
      useClass: AuditRepository,
    },
  ],
  exports: [AuditService, AUDIT_REPOSITORY_TOKEN],
})
export class AuditModule {}
