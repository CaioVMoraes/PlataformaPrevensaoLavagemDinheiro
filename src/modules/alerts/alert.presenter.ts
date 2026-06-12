import { Alert } from '../../shared/domain/alert';
import { AlertStatus } from '../../shared/domain/alert-status';
import { RiskClassification } from '../../shared/domain/risk-classification';
import { maskAccount, maskCpf } from '../../shared/security/masking';

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

export function presentAlert(alert: Alert): AlertView {
  return {
    id: alert.id,
    status: alert.status,
    riskClassification: alert.riskClassification,
    reason: alert.reason,
    createdAt: alert.createdAt,
    customer: {
      ...alert.customer,
      cpf: maskCpf(alert.customer.cpf),
      account: maskAccount(alert.customer.account),
    },
    transactions: alert.transactions.map((transaction) => ({ ...transaction })),
  };
}
