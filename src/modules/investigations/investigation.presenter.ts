import { AlertStatus } from '../../shared/domain/alert-status';
import { Evidence } from '../../shared/domain/evidence';
import { InvestigationStatus } from '../../shared/domain/investigation-status';
import { RiskClassification } from '../../shared/domain/risk-classification';
import { AlertView } from '../alerts/alert.presenter';

export interface InvestigationView {
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
  canProceedToRegulatoryEvaluation: boolean;
  alert: {
    id: string;
    status: AlertStatus;
    riskClassification: RiskClassification;
    customerName: string;
    reason: string;
  };
}

export function presentInvestigation(
  investigation: Omit<InvestigationView, 'canProceedToRegulatoryEvaluation' | 'alert'>,
  alert: AlertView,
): InvestigationView {
  const canProceedToRegulatoryEvaluation =
    investigation.suggestedRisk === RiskClassification.HIGH ||
    investigation.suggestedRisk === RiskClassification.CRITICAL;

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
