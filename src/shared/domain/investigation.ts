import { Evidence } from './evidence';
import { InvestigationStatus } from './investigation-status';
import { RiskClassification } from './risk-classification';

export interface Investigation {
  id: string;
  alertId: string;
  status: InvestigationStatus;
  assignedTo: string;
  assignedRole: string;
  openedAt: string;
  closedAt: string | null;
  suggestedRisk: RiskClassification;
  evidences: Evidence[];
  conclusion: string | null;
  reportReviewed: boolean;
}
