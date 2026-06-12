import { Evidence } from '../../shared/domain/evidence';
import { InvestigationStatus } from '../../shared/domain/investigation-status';
import { RiskClassification } from '../../shared/domain/risk-classification';

export interface ReportView {
  id: string;
  investigationId: string;
  generatedAt: string;
  status: 'DRAFT' | 'READY_FOR_APPROVAL';
  reviewed: boolean;
  caseStatus: InvestigationStatus;
  suggestedRisk: RiskClassification;
  canProceedToRegulatoryEvaluation: boolean;
  summary: string;
  evidences: Evidence[];
  analystConclusion: string | null;
}
