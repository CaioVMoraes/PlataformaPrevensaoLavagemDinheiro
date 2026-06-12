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
export declare function presentInvestigation(investigation: Omit<InvestigationView, 'canProceedToRegulatoryEvaluation' | 'alert'>, alert: AlertView): InvestigationView;
