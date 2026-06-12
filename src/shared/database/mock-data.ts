import { Alert } from '../domain/alert';
import { AlertStatus } from '../domain/alert-status';
import { AnalystRole } from '../domain/analyst-role';
import { AuditEventType } from '../domain/audit-event-type';
import { Investigation } from '../domain/investigation';
import { InvestigationStatus } from '../domain/investigation-status';
import { RiskClassification } from '../domain/risk-classification';

export interface AuditLog {
  id: string;
  user: string;
  action: AuditEventType;
  resource: string;
  result: 'SUCCESS' | 'ERROR';
  occurredAt: string;
  metadata: Record<string, string>;
}

export const mockedAlerts: Alert[] = [
  {
    id: 'ALT-1001',
    status: AlertStatus.IN_ANALYSIS,
    riskClassification: RiskClassification.HIGH,
    reason: 'Movimentacao acima do perfil historico em curto intervalo.',
    createdAt: '2026-06-10T13:30:00.000Z',
    customer: {
      id: 'CUS-001',
      name: 'Marina Almeida',
      cpf: '12345678945',
      account: '003412345678',
      profile: 'Pessoa fisica - varejo alta renda',
    },
    transactions: [
      {
        id: 'TRX-9001',
        amount: 85000,
        occurredAt: '2026-06-10T10:14:00.000Z',
        channel: 'PIX',
        counterparty: 'Empresa Horizonte LTDA',
      },
      {
        id: 'TRX-9002',
        amount: 78000,
        occurredAt: '2026-06-10T10:51:00.000Z',
        channel: 'TED',
        counterparty: 'Conta terceiro nao recorrente',
      },
    ],
  },
  {
    id: 'ALT-1002',
    status: AlertStatus.PENDING,
    riskClassification: RiskClassification.CRITICAL,
    reason: 'Operacoes fracionadas com recorrencia diaria e contraparte de risco.',
    createdAt: '2026-06-11T09:20:00.000Z',
    customer: {
      id: 'CUS-002',
      name: 'Rafael Souza',
      cpf: '98765432100',
      account: '009998881234',
      profile: 'Pessoa fisica - empreendedor',
    },
    transactions: [
      {
        id: 'TRX-9101',
        amount: 49000,
        occurredAt: '2026-06-11T08:02:00.000Z',
        channel: 'PIX',
        counterparty: 'Casa de Cambio Delta',
      },
      {
        id: 'TRX-9102',
        amount: 49500,
        occurredAt: '2026-06-11T08:07:00.000Z',
        channel: 'PIX',
        counterparty: 'Casa de Cambio Delta',
      },
    ],
  },
];

export const mockedInvestigations: Investigation[] = [
  {
    id: 'INV-5001',
    alertId: 'ALT-1001',
    status: InvestigationStatus.UNDER_REVIEW,
    assignedTo: 'Camila Rocha',
    assignedRole: AnalystRole.PLD_ANALYST,
    openedAt: '2026-06-10T14:00:00.000Z',
    closedAt: null,
    suggestedRisk: RiskClassification.HIGH,
    evidences: [
      {
        id: 'EVD-7001',
        description: 'Volume financeiro 5.6x superior a media mensal do cliente.',
        source: 'core-banking://customer/CUS-001/transactions',
        collectedAt: '2026-06-10T14:08:00.000Z',
      },
      {
        id: 'EVD-7002',
        description: 'Contraparte sem relacionamento previo nos ultimos 12 meses.',
        source: 'crm://relationships/CUS-001',
        collectedAt: '2026-06-10T14:12:00.000Z',
      },
    ],
    conclusion: null,
    reportReviewed: true,
  },
  {
    id: 'INV-5002',
    alertId: 'ALT-1002',
    status: InvestigationStatus.OPEN,
    assignedTo: 'Bruno Martins',
    assignedRole: AnalystRole.PLD_COORDINATOR,
    openedAt: '2026-06-11T09:45:00.000Z',
    closedAt: null,
    suggestedRisk: RiskClassification.CRITICAL,
    evidences: [
      {
        id: 'EVD-7101',
        description: 'Duas transferencias abaixo do limite operacional em janela de 5 minutos.',
        source: 'anti-fraud://rules/structuring',
        collectedAt: '2026-06-11T09:52:00.000Z',
      },
    ],
    conclusion: null,
    reportReviewed: false,
  },
];

export const mockedAuditLogs: AuditLog[] = [
  {
    id: 'AUD-3001',
    user: 'system',
    action: AuditEventType.ALERT_CREATED,
    resource: 'ALT-1001',
    result: 'SUCCESS',
    occurredAt: '2026-06-10T13:30:00.000Z',
    metadata: {
      riskClassification: RiskClassification.HIGH,
    },
  },
  {
    id: 'AUD-3002',
    user: 'Camila Rocha',
    action: AuditEventType.CUSTOMER_QUERY,
    resource: 'CUS-001',
    result: 'SUCCESS',
    occurredAt: '2026-06-10T14:06:00.000Z',
    metadata: {
      investigationId: 'INV-5001',
    },
  },
];
