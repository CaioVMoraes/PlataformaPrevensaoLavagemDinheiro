export type AlertStatus =
  | 'PENDING'
  | 'IN_ANALYSIS'
  | 'COMPLETED'
  | 'FALSE_POSITIVE'
  | 'REGULATORY_ESCALATION';

export type InvestigationStatus = 'OPEN' | 'UNDER_REVIEW' | 'CLOSED';

export type RiskClassification = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ApiSuccessResponse<TData> {
  success: true;
  data: TData;
}

export interface CustomerView {
  id: string;
  name: string;
  cpf: string;
  account: string;
  profile: string;
}

export interface TransactionView {
  id: string;
  amount: number;
  occurredAt: string;
  channel: string;
  counterparty: string;
}

export interface AlertView {
  id: string;
  status: AlertStatus;
  riskClassification: RiskClassification;
  reason: string;
  createdAt: string;
  customer: CustomerView;
  transactions: TransactionView[];
}

export interface Evidence {
  id: string;
  description: string;
  source: string;
  collectedAt: string;
}

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

export interface ChatbotAnswer {
  investigationId: string;
  question: string;
  answer: string;
  suggestedRisk: RiskClassification;
  evidences: Evidence[];
  justification: string;
  sources: Array<{
    name: string;
    origin: string;
  }>;
  humanDecisionRequired: true;
}

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

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  resource: string;
  result: 'SUCCESS' | 'ERROR';
  occurredAt: string;
  metadata: Record<string, string>;
}
