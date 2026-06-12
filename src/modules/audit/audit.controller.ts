import { Controller, Get } from '@nestjs/common';
import { AuditLog } from '../../shared/database/mock-data';
import { ApiSuccessResponse, successResponse } from '../../shared/http/api-response';
import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  listAuditLogs(): ApiSuccessResponse<AuditLog[]> {
    return successResponse(this.auditService.listAuditLogs());
  }
}
