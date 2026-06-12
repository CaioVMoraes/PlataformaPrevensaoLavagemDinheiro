import {
  AlertView,
  ApiSuccessResponse,
  AuditLog,
  ChatbotAnswer,
  InvestigationView,
  ReportView,
} from './domain';
import {
  createFallbackChatbotAnswer,
  createFallbackReport,
  fallbackAlerts,
  fallbackAuditLogs,
  fallbackInvestigations,
} from './mock-data';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000';

type ApiRequestInit = Omit<RequestInit, 'headers'> & {
  headers?: Record<string, string>;
};

async function requestData<TData>(path: string, init?: ApiRequestInit): Promise<TData> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${String(response.status)}`);
  }

  const payload = (await response.json()) as ApiSuccessResponse<TData>;

  return payload.data;
}

export async function listAlerts(): Promise<AlertView[]> {
  try {
    return await requestData<AlertView[]>('/alerts');
  } catch {
    return fallbackAlerts;
  }
}

export async function listInvestigations(): Promise<InvestigationView[]> {
  try {
    return await requestData<InvestigationView[]>('/investigations');
  } catch {
    return fallbackInvestigations;
  }
}

export async function listAuditLogs(): Promise<AuditLog[]> {
  try {
    return await requestData<AuditLog[]>('/audit');
  } catch {
    return fallbackAuditLogs;
  }
}

export async function generateReport(investigationId: string): Promise<ReportView> {
  try {
    return await requestData<ReportView>(`/reports/${investigationId}`);
  } catch {
    return createFallbackReport(investigationId);
  }
}

export async function queryChatbot(
  investigationId: string,
  question: string,
): Promise<ChatbotAnswer> {
  try {
    return await requestData<ChatbotAnswer>('/chatbot/query', {
      method: 'POST',
      body: JSON.stringify({
        user: 'Frontend Local',
        investigationId,
        question,
      }),
    });
  } catch {
    return createFallbackChatbotAnswer(investigationId, question);
  }
}
