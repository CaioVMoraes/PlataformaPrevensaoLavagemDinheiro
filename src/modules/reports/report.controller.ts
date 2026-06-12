import { Controller, Get, Param } from '@nestjs/common';
import { ApiSuccessResponse, successResponse } from '../../shared/http/api-response';
import { ReportService } from './report.service';
import { ReportView } from './report-view';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get(':investigationId')
  generateReport(
    @Param('investigationId') investigationId: string,
  ): ApiSuccessResponse<ReportView> {
    return successResponse(this.reportService.generateReport(investigationId));
  }
}
