import { AlertView, AuditLog, ChatbotAnswer, InvestigationView, ReportView } from './domain';

export const fallbackAlerts: AlertView[] = [
  {
    id: 'ALT-1001',
    status: 'IN_ANALYSIS',
    riskClassification: 'HIGH',
    reason: 'Movimentacao acima do perfil historico em curto intervalo.',
    createdAt: '2026-06-10T13:30:00.000Z',
    customer: {
      id: 'CUS-001',
      name: 'Marina Almeida',
      cpf: '123.***.***-45',
      account: '****5678',
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
    status: 'PENDING',
    riskClassification: 'CRITICAL',
    reason: 'Operacoes fracionadas com recorrencia diaria e contraparte de risco.',
    createdAt: '2026-06-11T09:20:00.000Z',
    customer: {
      id: 'CUS-002',
      name: 'Rafael Souza',
      cpf: '987.***.***-00',
      account: '****1234',
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

export const fallbackInvestigations: InvestigationView[] = [
  {
    id: 'INV-5001',
    alertId: 'ALT-1001',
    status: 'UNDER_REVIEW',
    assignedTo: 'Camila Rocha',
    assignedRole: 'Analista PLD',
    openedAt: '2026-06-10T14:00:00.000Z',
    closedAt: null,
    suggestedRisk: 'HIGH',
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
    canProceedToRegulatoryEvaluation: true,
    alert: {
      id: 'ALT-1001',
      status: 'IN_ANALYSIS',
      riskClassification: 'HIGH',
      customerName: 'Marina Almeida',
      reason: 'Movimentacao acima do perfil historico em curto intervalo.',
    },
  },
  {
    id: 'INV-5002',
    alertId: 'ALT-1002',
    status: 'OPEN',
    assignedTo: 'Bruno Martins',
    assignedRole: 'Coordenador PLD',
    openedAt: '2026-06-11T09:45:00.000Z',
    closedAt: null,
    suggestedRisk: 'CRITICAL',
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
    canProceedToRegulatoryEvaluation: true,
    alert: {
      id: 'ALT-1002',
      status: 'PENDING',
      riskClassification: 'CRITICAL',
      customerName: 'Rafael Souza',
      reason: 'Operacoes fracionadas com recorrencia diaria e contraparte de risco.',
    },
  },
];

export const fallbackAuditLogs: AuditLog[] = [
  {
    id: 'AUD-3001',
    user: 'system',
    action: 'ALERT_CREATED',
    resource: 'ALT-1001',
    result: 'SUCCESS',
    occurredAt: '2026-06-10T13:30:00.000Z',
    metadata: {
      riskClassification: 'HIGH',
    },
  },
  {
    id: 'AUD-3002',
    user: 'Camila Rocha',
    action: 'CUSTOMER_QUERY',
    resource: 'CUS-001',
    result: 'SUCCESS',
    occurredAt: '2026-06-10T14:06:00.000Z',
    metadata: {
      investigationId: 'INV-5001',
    },
  },
];

export function createFallbackChatbotAnswer(
  investigationId: string,
  question: string,
): ChatbotAnswer {
  const investigation =
    fallbackInvestigations.find((candidate) => candidate.id === investigationId) ??
    fallbackInvestigations[0];

  return {
    investigationId: investigation.id,
    question,
    answer: `A investigacao ${investigation.id} possui risco sugerido ${investigation.suggestedRisk}.`,
    suggestedRisk: investigation.suggestedRisk,
    evidences: investigation.evidences,
    justification:
      'A sugestao combina evidencias coletadas, perfil do cliente e motivo do alerta. A decisao final permanece com o analista.',
    sources: [
      {
        name: 'Investigacao',
        origin: `investigations/${investigation.id}`,
      },
      {
        name: 'Normas internas',
        origin: 'business-rules.md#BR-008',
      },
    ],
    humanDecisionRequired: true,
  };
}

export function createFallbackReport(investigationId: string): ReportView {
  const investigation =
    fallbackInvestigations.find((candidate) => candidate.id === investigationId) ??
    fallbackInvestigations[0];

  return {
    id: `RPT-${investigation.id.replace('INV-', '')}`,
    investigationId: investigation.id,
    generatedAt: new Date().toISOString(),
    status: investigation.reportReviewed ? 'READY_FOR_APPROVAL' : 'DRAFT',
    reviewed: investigation.reportReviewed,
    caseStatus: investigation.status,
    suggestedRisk: investigation.suggestedRisk,
    canProceedToRegulatoryEvaluation: investigation.canProceedToRegulatoryEvaluation,
    summary: `Relatorio mockado para ${investigation.id} a partir do alerta ${investigation.alert.id}.`,
    evidences: investigation.evidences,
    analystConclusion: investigation.conclusion,
  };
}
