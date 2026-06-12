import { AlertStatus } from './alert-status';
import { Customer } from './customer';
import { RiskClassification } from './risk-classification';
import { Transaction } from './transaction';
export interface Alert {
    id: string;
    status: AlertStatus;
    riskClassification: RiskClassification;
    reason: string;
    createdAt: string;
    customer: Customer;
    transactions: Transaction[];
}
