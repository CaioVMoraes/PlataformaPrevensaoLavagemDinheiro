"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertRepository = void 0;
const common_1 = require("@nestjs/common");
const mock_data_1 = require("../../shared/database/mock-data");
let AlertRepository = class AlertRepository {
    alerts = mock_data_1.mockedAlerts.map((alert) => ({
        ...alert,
        customer: { ...alert.customer },
        transactions: alert.transactions.map((transaction) => ({ ...transaction })),
    }));
    findAll() {
        return this.alerts.map((alert) => this.cloneAlert(alert));
    }
    findById(alertId) {
        const alert = this.alerts.find((candidate) => candidate.id === alertId);
        return alert ? this.cloneAlert(alert) : null;
    }
    updateStatus(alertId, status) {
        const alert = this.alerts.find((candidate) => candidate.id === alertId);
        if (!alert) {
            return null;
        }
        alert.status = status;
        return this.cloneAlert(alert);
    }
    cloneAlert(alert) {
        return {
            ...alert,
            customer: { ...alert.customer },
            transactions: alert.transactions.map((transaction) => ({ ...transaction })),
        };
    }
};
exports.AlertRepository = AlertRepository;
exports.AlertRepository = AlertRepository = __decorate([
    (0, common_1.Injectable)()
], AlertRepository);
//# sourceMappingURL=alert.repository.js.map