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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertController = void 0;
const common_1 = require("@nestjs/common");
const api_response_1 = require("../../shared/http/api-response");
const alert_service_1 = require("./alert.service");
const update_alert_status_dto_1 = require("./dto/update-alert-status.dto");
let AlertController = class AlertController {
    alertService;
    constructor(alertService) {
        this.alertService = alertService;
    }
    listAlerts() {
        return (0, api_response_1.successResponse)(this.alertService.listAlerts());
    }
    getAlert(alertId) {
        return (0, api_response_1.successResponse)(this.alertService.getAlert(alertId));
    }
    updateStatus(alertId, input) {
        return (0, api_response_1.successResponse)(this.alertService.updateStatus(alertId, input));
    }
};
exports.AlertController = AlertController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AlertController.prototype, "listAlerts", null);
__decorate([
    (0, common_1.Get)(':alertId'),
    __param(0, (0, common_1.Param)('alertId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], AlertController.prototype, "getAlert", null);
__decorate([
    (0, common_1.Patch)(':alertId/status'),
    __param(0, (0, common_1.Param)('alertId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_alert_status_dto_1.UpdateAlertStatusDto]),
    __metadata("design:returntype", Object)
], AlertController.prototype, "updateStatus", null);
exports.AlertController = AlertController = __decorate([
    (0, common_1.Controller)('alerts'),
    __metadata("design:paramtypes", [alert_service_1.AlertService])
], AlertController);
//# sourceMappingURL=alert.controller.js.map