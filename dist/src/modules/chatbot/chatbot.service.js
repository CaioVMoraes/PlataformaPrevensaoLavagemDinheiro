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
exports.ChatbotService = void 0;
const common_1 = require("@nestjs/common");
const audit_event_type_1 = require("../../shared/domain/audit-event-type");
const audit_service_1 = require("../audit/audit.service");
const investigation_service_1 = require("../investigations/investigation.service");
let ChatbotService = class ChatbotService {
    investigationService;
    auditService;
    constructor(investigationService, auditService) {
        this.investigationService = investigationService;
        this.auditService = auditService;
    }
    answerQuestion(input) {
        const investigation = this.investigationService.getInvestigation(input.investigationId);
        const totalAmount = investigation.alert.reason.includes('fracionadas')
            ? 'ha indagacao sobre fracionamento operacional'
            : 'ha volume financeiro superior ao perfil esperado';
        this.auditService.register({
            user: input.user,
            action: audit_event_type_1.AuditEventType.CHATBOT_QUERY,
            resource: input.investigationId,
            result: 'SUCCESS',
            metadata: {
                question: input.question,
                evidenceCount: String(investigation.evidences.length),
            },
        });
        return {
            investigationId: investigation.id,
            question: input.question,
            answer: `A investigacao ${investigation.id} possui risco sugerido ` +
                `${investigation.suggestedRisk}. Pelo contexto mockado, ${totalAmount}.`,
            suggestedRisk: investigation.suggestedRisk,
            evidences: investigation.evidences,
            justification: 'A sugestao considera evidencias coletadas, perfil do cliente, recorrencia e motivo do alerta. A IA nao encerra o caso nem aprova relatorio.',
            sources: [
                {
                    name: 'Investigacao',
                    origin: `investigations/${investigation.id}`,
                },
                {
                    name: 'Cliente',
                    origin: `alerts/${investigation.alert.id}/customer`,
                },
                {
                    name: 'Transacoes',
                    origin: `alerts/${investigation.alert.id}/transactions`,
                },
                {
                    name: 'Normas internas',
                    origin: 'business-rules.md#BR-008',
                },
            ],
            humanDecisionRequired: true,
        };
    }
};
exports.ChatbotService = ChatbotService;
exports.ChatbotService = ChatbotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [investigation_service_1.InvestigationService,
        audit_service_1.AuditService])
], ChatbotService);
//# sourceMappingURL=chatbot.service.js.map