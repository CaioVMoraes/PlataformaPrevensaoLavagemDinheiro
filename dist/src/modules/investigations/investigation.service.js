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
exports.InvestigationService = void 0;
const common_1 = require("@nestjs/common");
const analyst_role_1 = require("../../shared/domain/analyst-role");
const audit_event_type_1 = require("../../shared/domain/audit-event-type");
const investigation_status_1 = require("../../shared/domain/investigation-status");
const alert_presenter_1 = require("../alerts/alert.presenter");
const alert_repository_1 = require("../alerts/alert.repository");
const audit_service_1 = require("../audit/audit.service");
const investigation_presenter_1 = require("./investigation.presenter");
const investigation_repository_1 = require("./investigation.repository");
let InvestigationService = class InvestigationService {
    investigationRepository;
    alertRepository;
    auditService;
    constructor(investigationRepository, alertRepository, auditService) {
        this.investigationRepository = investigationRepository;
        this.alertRepository = alertRepository;
        this.auditService = auditService;
    }
    listInvestigations() {
        return this.investigationRepository
            .findAll()
            .map((investigation) => this.toInvestigationView(investigation));
    }
    getInvestigation(investigationId) {
        const investigation = this.findInvestigationOrThrow(investigationId);
        return this.toInvestigationView(investigation);
    }
    closeInvestigation(investigationId, input) {
        const investigation = this.findInvestigationOrThrow(investigationId);
        this.assertCanCloseInvestigation(investigation, input);
        const closedInvestigation = this.investigationRepository.close(investigationId, input.conclusion);
        if (!closedInvestigation) {
            throw new common_1.NotFoundException({
                message: 'Investigation not found',
                code: 'INVESTIGATION_NOT_FOUND',
            });
        }
        this.auditService.register({
            user: input.user,
            action: audit_event_type_1.AuditEventType.INVESTIGATION_FINISHED,
            resource: investigationId,
            result: 'SUCCESS',
            metadata: {
                alertId: closedInvestigation.alertId,
                previousStatus: investigation.status,
                newStatus: closedInvestigation.status,
            },
        });
        return this.toInvestigationView(closedInvestigation);
    }
    findInvestigationOrThrow(investigationId) {
        const investigation = this.investigationRepository.findById(investigationId);
        if (!investigation) {
            throw new common_1.NotFoundException({
                message: 'Investigation not found',
                code: 'INVESTIGATION_NOT_FOUND',
            });
        }
        return investigation;
    }
    toInvestigationView(investigation) {
        const alert = this.alertRepository.findById(investigation.alertId);
        if (!alert) {
            throw new common_1.NotFoundException({
                message: 'Alert linked to investigation not found',
                code: 'INVESTIGATION_ALERT_NOT_FOUND',
            });
        }
        return (0, investigation_presenter_1.presentInvestigation)(investigation, (0, alert_presenter_1.presentAlert)(alert));
    }
    assertCanCloseInvestigation(investigation, input) {
        const isAuthorizedRole = input.userRole === analyst_role_1.AnalystRole.PLD_ANALYST ||
            input.userRole === analyst_role_1.AnalystRole.PLD_COORDINATOR;
        if (!isAuthorizedRole) {
            throw new common_1.ForbiddenException({
                message: 'User role is not authorized to close investigations',
                code: 'UNAUTHORIZED_INVESTIGATION_ROLE',
            });
        }
        if (investigation.status === investigation_status_1.InvestigationStatus.CLOSED) {
            throw new common_1.BadRequestException({
                message: 'Investigation is already closed',
                code: 'INVESTIGATION_ALREADY_CLOSED',
            });
        }
        if (investigation.evidences.length < 1) {
            throw new common_1.BadRequestException({
                message: 'Investigation must have at least one evidence',
                code: 'INVESTIGATION_WITHOUT_EVIDENCE',
            });
        }
        if (!investigation.reportReviewed) {
            throw new common_1.BadRequestException({
                message: 'Report must be reviewed before closing the investigation',
                code: 'REPORT_NOT_REVIEWED',
            });
        }
    }
};
exports.InvestigationService = InvestigationService;
exports.InvestigationService = InvestigationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [investigation_repository_1.InvestigationRepository,
        alert_repository_1.AlertRepository,
        audit_service_1.AuditService])
], InvestigationService);
//# sourceMappingURL=investigation.service.js.map