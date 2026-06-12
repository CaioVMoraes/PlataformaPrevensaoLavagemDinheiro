'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertCircle, CheckCircle2, LockKeyhole, PlayCircle, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ApiClientError, closeInvestigation, updateAlertStatus } from '@/lib/api';
import { AlertStatus, AlertView, InvestigationView } from '@/lib/domain';
import { getAlertStatusTone, getInvestigationStatusTone } from '@/lib/badge-tones';
import { translateAlertStatus, translateInvestigationStatus } from '@/lib/formatters';

interface DemoFeedback {
  type: 'success' | 'error' | 'info';
  title: string;
  description: string;
}

const statusOptions: Array<{
  status: AlertStatus;
  description: string;
}> = [
  {
    status: 'IN_ANALYSIS',
    description: 'Move o alerta para triagem ativa.',
  },
  {
    status: 'COMPLETED',
    description: 'Marca a analise operacional como concluida.',
  },
  {
    status: 'FALSE_POSITIVE',
    description: 'Demonstra um encerramento sem escalonamento.',
  },
  {
    status: 'REGULATORY_ESCALATION',
    description: 'Simula envio para avaliacao regulatoria.',
  },
];

function getErrorFeedback(error: unknown): DemoFeedback {
  if (error instanceof ApiClientError) {
    return {
      type: 'error',
      title: error.code,
      description: error.message,
    };
  }

  return {
    type: 'error',
    title: 'UNEXPECTED_ERROR',
    description: 'Nao foi possivel concluir a demonstracao.',
  };
}

export function DemoPanel({
  alert,
  investigation,
}: {
  alert: AlertView | null;
  investigation: InvestigationView | null;
}) {
  const queryClient = useQueryClient();
  const [feedback, setFeedback] = useState<DemoFeedback>({
    type: 'info',
    title: 'Pronto para demonstrar',
    description: 'Selecione um alerta na fila e execute um dos cenarios abaixo.',
  });

  const refreshData = () => {
    void queryClient.invalidateQueries({ queryKey: ['alerts'] });
    void queryClient.invalidateQueries({ queryKey: ['investigations'] });
    void queryClient.invalidateQueries({ queryKey: ['audit'] });
    void queryClient.invalidateQueries({ queryKey: ['report'] });
    setFeedback({
      type: 'info',
      title: 'Dados atualizados',
      description: 'As consultas foram solicitadas novamente ao backend local.',
    });
  };

  const updateStatusMutation = useMutation({
    mutationFn: async (status: AlertStatus) => {
      if (!alert) {
        throw new ApiClientError('Alert not selected', 'ALERT_NOT_SELECTED', 400);
      }

      return updateAlertStatus(alert.id, status);
    },
    onSuccess: (updatedAlert) => {
      queryClient.setQueryData<AlertView[]>(['alerts'], (currentAlerts) =>
        currentAlerts?.map((currentAlert) =>
          currentAlert.id === updatedAlert.id ? updatedAlert : currentAlert,
        ),
      );
      void queryClient.invalidateQueries({ queryKey: ['investigations'] });
      void queryClient.invalidateQueries({ queryKey: ['audit'] });
      setFeedback({
        type: 'success',
        title: 'Status atualizado',
        description: `${updatedAlert.id} agora esta como ${translateAlertStatus(updatedAlert.status)}.`,
      });
    },
    onError: (error) => {
      setFeedback(getErrorFeedback(error));
    },
  });

  const closeInvestigationMutation = useMutation({
    mutationFn: async () => {
      if (!investigation) {
        throw new ApiClientError('Investigation not selected', 'INVESTIGATION_NOT_SELECTED', 400);
      }

      return closeInvestigation(investigation.id);
    },
    onSuccess: (closedInvestigation) => {
      queryClient.setQueryData<InvestigationView[]>(
        ['investigations'],
        (currentInvestigations) =>
          currentInvestigations?.map((currentInvestigation) =>
            currentInvestigation.id === closedInvestigation.id
              ? closedInvestigation
              : currentInvestigation,
          ),
      );
      void queryClient.invalidateQueries({ queryKey: ['audit'] });
      void queryClient.invalidateQueries({ queryKey: ['report', closedInvestigation.id] });
      setFeedback({
        type: 'success',
        title: 'Investigacao encerrada',
        description: `${closedInvestigation.id} recebeu conclusao e status fechado.`,
      });
    },
    onError: (error) => {
      setFeedback(getErrorFeedback(error));
    },
  });

  const isWorking = updateStatusMutation.isPending || closeInvestigationMutation.isPending;
  const feedbackClassName =
    feedback.type === 'success'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
      : feedback.type === 'error'
        ? 'border-red-200 bg-red-50 text-red-800'
        : 'border-blue-200 bg-blue-50 text-blue-800';

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">
      <section className="rounded-md border border-border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-teal-50 text-teal-700">
              <PlayCircle className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-base font-semibold">Cenarios de demonstracao</h2>
              <p className="text-sm text-muted-foreground">
                {alert ? `${alert.id} - ${alert.customer.name}` : 'Nenhum alerta selecionado'}
              </p>
            </div>
          </div>
          <Button variant="secondary" onClick={refreshData} disabled={isWorking} type="button">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {statusOptions.map((option) => (
            <button
              className="rounded-md border border-border bg-white p-4 text-left transition-colors hover:border-primary hover:bg-teal-50 disabled:pointer-events-none disabled:opacity-50"
              disabled={!alert || isWorking}
              key={option.status}
              onClick={() => {
                updateStatusMutation.mutate(option.status);
              }}
              type="button"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge tone={getAlertStatusTone(option.status)}>
                  {translateAlertStatus(option.status)}
                </Badge>
                <span className="text-xs text-muted-foreground">PATCH /alerts</span>
              </div>
              <p className="mt-3 text-sm text-slate-700">{option.description}</p>
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-md border border-border bg-slate-50 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold">Fechamento de investigacao</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Valida evidencia minima, relatorio revisado e papel autorizado.
              </p>
            </div>
            {investigation ? (
              <Badge tone={getInvestigationStatusTone(investigation.status)}>
                {translateInvestigationStatus(investigation.status)}
              </Badge>
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              disabled={!investigation || isWorking}
              onClick={() => {
                closeInvestigationMutation.mutate();
              }}
              type="button"
            >
              <LockKeyhole className="h-4 w-4" />
              Encerrar caso
            </Button>
            <Badge tone={investigation?.reportReviewed ? 'success' : 'warning'}>
              {investigation?.reportReviewed ? 'Relatorio revisado' : 'Bloqueia fechamento'}
            </Badge>
          </div>
        </div>
      </section>

      <aside className="rounded-md border border-border bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold">Resultado</h2>
        <div className={`mt-4 rounded-md border p-4 ${feedbackClassName}`}>
          <div className="flex items-start gap-3">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            ) : (
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            )}
            <div>
              <h3 className="text-sm font-semibold">{feedback.title}</h3>
              <p className="mt-1 text-sm">{feedback.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-3 text-sm text-muted-foreground">
          <p>
            Para demonstrar sucesso, selecione `ALT-1001` e clique em `Encerrar caso`.
          </p>
          <p>
            Para demonstrar bloqueio de regra, selecione `ALT-1002` e tente encerrar a
            investigacao.
          </p>
          <p>
            A aba `Auditoria` mostra os eventos gerados quando o backend local esta rodando.
          </p>
        </div>
      </aside>
    </div>
  );
}
