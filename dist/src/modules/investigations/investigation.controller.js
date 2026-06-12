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
exports.InvestigationController = void 0;
const common_1 = require("@nestjs/common");
const api_response_1 = require("../../shared/http/api-response");
const close_investigation_dto_1 = require("./dto/close-investigation.dto");
const investigation_service_1 = require("./investigation.service");
let InvestigationController = class InvestigationController {
    investigationService;
    constructor(investigationService) {
        this.investigationService = investigationService;
    }
    listInvestigations() {
        return (0, api_response_1.successResponse)(this.investigationService.listInvestigations());
    }
    getInvestigation(investigationId) {
        return (0, api_response_1.successResponse)(this.investigationService.getInvestigation(investigationId));
    }
    closeInvestigation(investigationId, input) {
        return (0, api_response_1.successResponse)(this.investigationService.closeInvestigation(investigationId, input));
    }
};
exports.InvestigationController = InvestigationController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], InvestigationController.prototype, "listInvestigations", null);
__decorate([
    (0, common_1.Get)(':investigationId'),
    __param(0, (0, common_1.Param)('investigationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], InvestigationController.prototype, "getInvestigation", null);
__decorate([
    (0, common_1.Post)(':investigationId/close'),
    __param(0, (0, common_1.Param)('investigationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, close_investigation_dto_1.CloseInvestigationDto]),
    __metadata("design:returntype", Object)
], InvestigationController.prototype, "closeInvestigation", null);
exports.InvestigationController = InvestigationController = __decorate([
    (0, common_1.Controller)('investigations'),
    __metadata("design:paramtypes", [investigation_service_1.InvestigationService])
], InvestigationController);
//# sourceMappingURL=investigation.controller.js.map