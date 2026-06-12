"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestigationsModule = void 0;
const common_1 = require("@nestjs/common");
const alerts_module_1 = require("../alerts/alerts.module");
const audit_module_1 = require("../audit/audit.module");
const investigation_controller_1 = require("./investigation.controller");
const investigation_repository_1 = require("./investigation.repository");
const investigation_service_1 = require("./investigation.service");
let InvestigationsModule = class InvestigationsModule {
};
exports.InvestigationsModule = InvestigationsModule;
exports.InvestigationsModule = InvestigationsModule = __decorate([
    (0, common_1.Module)({
        imports: [alerts_module_1.AlertsModule, audit_module_1.AuditModule],
        controllers: [investigation_controller_1.InvestigationController],
        providers: [investigation_repository_1.InvestigationRepository, investigation_service_1.InvestigationService],
        exports: [investigation_repository_1.InvestigationRepository, investigation_service_1.InvestigationService],
    })
], InvestigationsModule);
//# sourceMappingURL=investigations.module.js.map