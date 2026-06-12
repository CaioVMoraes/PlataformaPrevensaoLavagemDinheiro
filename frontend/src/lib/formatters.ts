import { AlertStatus, InvestigationStatus, RiskClassification } from './domain';

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function translateRisk(riskClassification: RiskClassification): string {
  const labels: Record<RiskClassification, string> = {
    LOW: 'Baixo',
    MEDIUM: 'Medio',
    HIGH: 'Alto',
    CRITICAL: 'Critico',
  };

  return labels[riskClassification];
}

export function translateAlertStatus(status: AlertStatus): string {
  const labels: Record<AlertStatus, string> = {
    PENDING: 'Pendente',
    IN_ANALYSIS: 'Em analise',
    COMPLETED: 'Concluido',
    FALSE_POSITIVE: 'Falso positivo',
    REGULATORY_ESCALATION: 'Escalado',
  };

  return labels[status];
}

export function translateInvestigationStatus(status: InvestigationStatus): string {
  const labels: Record<InvestigationStatus, string> = {
    OPEN: 'Aberta',
    UNDER_REVIEW: 'Em revisao',
    CLOSED: 'Fechada',
  };

  return labels[status];
}
