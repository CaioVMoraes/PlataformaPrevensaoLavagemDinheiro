import {
  AlertStatus,
  AlertView,
  ApiErrorResponse,
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

export class ApiClientError extends Error {
  constructor(
    message: string,
    readonly code: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

async function readJsonResponse(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function parseErrorResponse(payload: unknown): ApiErrorResponse | null {
  if (!isObject(payload)) {
    return null;
  }

  if (
    payload.success === false &&
    typeof payload.message === 'string' &&
    typeof payload.code === 'string'
  ) {
    return {
      success: false,
      message: payload.message,
      code: payload.code,
    };
  }

  return null;
}

async function requestData<TData>(path: string, init?: ApiRequestInit): Promise<TData> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const errorPayload = parseErrorResponse(await readJsonResponse(response));

    throw new ApiClientError(
      errorPayload?.message ?? `API request failed with status ${String(response.status)}`,
      errorPayload?.code ?? 'API_REQUEST_FAILED',
      response.status,
    );
  }

  const payload = (await readJsonResponse(response)) as ApiSuccessResponse<TData>;

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

export async function updateAlertStatus(
  alertId: string,
  status: AlertStatus,
): Promise<AlertView> {
  try {
    return await requestData<AlertView>(`/alerts/${alertId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({
        status,
        user: 'Frontend Local',
        reason: `Demonstracao frontend: status alterado para ${status}`,
      }),
    });
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    const alert = fallbackAlerts.find((candidate) => candidate.id === alertId);

    if (!alert) {
      throw new ApiClientError('Alert not found', 'ALERT_NOT_FOUND', 404);
    }

    return {
      ...alert,
      status,
      customer: { ...alert.customer },
      transactions: alert.transactions.map((transaction) => ({ ...transaction })),
    };
  }
}

export async function closeInvestigation(investigationId: string): Promise<InvestigationView> {
  try {
    return await requestData<InvestigationView>(`/investigations/${investigationId}/close`, {
      method: 'POST',
      body: JSON.stringify({
        user: 'Frontend Local',
        userRole: 'Analista PLD',
        conclusion: 'Conclusao registrada a partir da demonstracao do frontend.',
      }),
    });
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    const investigation = fallbackInvestigations.find(
      (candidate) => candidate.id === investigationId,
    );

    if (!investigation) {
      throw new ApiClientError('Investigation not found', 'INVESTIGATION_NOT_FOUND', 404);
    }

    if (!investigation.reportReviewed) {
      throw new ApiClientError(
        'Report must be reviewed before closing the investigation',
        'REPORT_NOT_REVIEWED',
        400,
      );
    }

    if (investigation.status === 'CLOSED') {
      throw new ApiClientError(
        'Investigation is already closed',
        'INVESTIGATION_ALREADY_CLOSED',
        400,
      );
    }

    return {
      ...investigation,
      status: 'CLOSED',
      closedAt: new Date().toISOString(),
      conclusion: 'Conclusao registrada a partir da demonstracao do frontend.',
      evidences: investigation.evidences.map((evidence) => ({ ...evidence })),
      alert: { ...investigation.alert },
    };
  }
}
