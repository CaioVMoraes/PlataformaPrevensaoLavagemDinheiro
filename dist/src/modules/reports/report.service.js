"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const audit_event_type_1 = require("../../shared/domain/audit-event-type");
const audit_service_1 = require("../audit/audit.service");
const investigation_service_1 = require("../investigations/investigation.service");
let ReportService = class ReportService {
    investigationService;
    auditService;
    constructor(investigationService, auditService) {
        this.investigationService = investigationService;
        this.auditService = auditService;
    }
    generateReport(investigationId) {
        const investigation = this.investigationService.getInvestigation(investigationId);
        const status = investigation.reportReviewed ? 'READY_FOR_APPROVAL' : 'DRAFT';
        this.auditService.register({
            user: 'local-api',
            action: audit_event_type_1.AuditEventType.REPORT_GENERATED,
            resource: investigationId,
            result: 'SUCCESS',
            metadata: {
                reportStatus: status,
            },
        });
        return {
            id: `RPT-${investigation.id.replace('INV-', '')}`,
            investigationId: investigation.id,
            generatedAt: new Date().toISOString(),
            status,
            reviewed: investigation.reportReviewed,
            caseStatus: investigation.status,
            suggestedRisk: investigation.suggestedRisk,
            canProceedToRegulatoryEvaluation: investigation.canProceedToRegulatoryEvaluation,
            summary: `Relatorio mockado para ${investigation.id}. ` +
                `O alerta ${investigation.alert.id} foi classificado como ${investigation.alert.riskClassification}.`,
            evidences: investigation.evidences,
            analystConclusion: investigation.conclusion,
        };
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [investigation_service_1.InvestigationService,
        audit_service_1.AuditService])
], ReportService);
//# sourceMappingURL=report.service.js.map