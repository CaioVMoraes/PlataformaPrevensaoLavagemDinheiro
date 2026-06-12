"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentInvestigation = presentInvestigation;
const risk_classification_1 = require("../../shared/domain/risk-classification");
function presentInvestigation(investigation, alert) {
    const canProceedToRegulatoryEvaluation = investigation.suggestedRisk === risk_classification_1.RiskClassification.HIGH ||
        investigation.suggestedRisk === risk_classification_1.RiskClassification.CRITICAL;
    return {
        ...investigation,
        evidences: investigation.evidences.map((evidence) => ({ ...evidence })),
        canProceedToRegulatoryEvaluation,
        alert: {
            id: alert.id,
            status: alert.status,
            riskClassification: alert.riskClassification,
            customerName: alert.customer.name,
            reason: alert.reason,
        },
    };
}
//# sourceMappingURL=investigation.presenter.js.map