"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentAlert = presentAlert;
const masking_1 = require("../../shared/security/masking");
function presentAlert(alert) {
    return {
        id: alert.id,
        status: alert.status,
        riskClassification: alert.riskClassification,
        reason: alert.reason,
        createdAt: alert.createdAt,
        customer: {
            ...alert.customer,
            cpf: (0, masking_1.maskCpf)(alert.customer.cpf),
            account: (0, masking_1.maskAccount)(alert.customer.account),
        },
        transactions: alert.transactions.map((transaction) => ({ ...transaction })),
    };
}
//# sourceMappingURL=alert.presenter.js.map