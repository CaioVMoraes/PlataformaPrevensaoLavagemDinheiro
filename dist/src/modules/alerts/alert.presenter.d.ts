import { Alert } from '../../shared/domain/alert';
import { AlertStatus } from '../../shared/domain/alert-status';
import { RiskClassification } from '../../shared/domain/risk-classification';
export interface AlertView {
    id: string;
    status: AlertStatus;
    riskClassification: RiskClassification;
    reason: string;
    createdAt: string;
    customer: {
        id: string;
        name: string;
        cpf: string;
        account: string;
        profile: string;
    };
    transactions: Array<{
        id: string;
        amount: number;
        occurredAt: string;
        channel: string;
        counterparty: string;
    }>;
}
export declare function presentAlert(alert: Alert): AlertView;
