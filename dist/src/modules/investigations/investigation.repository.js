"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestigationRepository = void 0;
const common_1 = require("@nestjs/common");
const investigation_status_1 = require("../../shared/domain/investigation-status");
const mock_data_1 = require("../../shared/database/mock-data");
let InvestigationRepository = class InvestigationRepository {
    investigations = mock_data_1.mockedInvestigations.map((investigation) => this.cloneInvestigation(investigation));
    findAll() {
        return this.investigations.map((investigation) => this.cloneInvestigation(investigation));
    }
    findById(investigationId) {
        const investigation = this.investigations.find((candidate) => candidate.id === investigationId);
        return investigation ? this.cloneInvestigation(investigation) : null;
    }
    close(investigationId, conclusion) {
        const investigation = this.investigations.find((candidate) => candidate.id === investigationId);
        if (!investigation) {
            return null;
        }
        investigation.status = investigation_status_1.InvestigationStatus.CLOSED;
        investigation.closedAt = new Date().toISOString();
        investigation.conclusion = conclusion;
        return this.cloneInvestigation(investigation);
    }
    cloneInvestigation(investigation) {
        return {
            ...investigation,
            evidences: investigation.evidences.map((evidence) => ({ ...evidence })),
        };
    }
};
exports.InvestigationRepository = InvestigationRepository;
exports.InvestigationRepository = InvestigationRepository = __decorate([
    (0, common_1.Injectable)()
], InvestigationRepository);
//# sourceMappingURL=investigation.repository.js.map