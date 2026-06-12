import { ApiSuccessResponse } from '../../shared/http/api-response';
import { ReportService } from './report.service';
import { ReportView } from './report-view';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    generateReport(investigationId: string): ApiSuccessResponse<ReportView>;
}
