import { Badge } from '@/components/ui/badge';
import { AlertView, InvestigationView } from '@/lib/domain';
import { getInvestigationStatusTone, getRiskTone } from '@/lib/badge-tones';
import {
  formatCurrency,
  formatDateTime,
  translateInvestigationStatus,
  translateRisk,
} from '@/lib/formatters';

export function CasePanel({
  alert,
  investigation,
}: {
  alert: AlertView | null;
  investigation: InvestigationView | null;
}) {
  if (!alert || !investigation) {
    return (
      <section className="rounded-md border border-border bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold">Caso nao selecionado</h2>
        <p className="mt-2 text-sm text-muted-foreground">Selecione um alerta na fila.</p>
      </section>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-md border border-border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">{alert.customer.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {alert.customer.cpf} - {alert.customer.account}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge tone={getRiskTone(investigation.suggestedRisk)}>
              {translateRisk(investigation.suggestedRisk)}
            </Badge>
            <Badge tone={getInvestigationStatusTone(investigation.status)}>
              {translateInvestigationStatus(investigation.status)}
            </Badge>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-md bg-muted p-3">
            <span className="text-xs font-medium text-muted-foreground">Investigacao</span>
            <strong className="mt-1 block text-sm">{investigation.id}</strong>
          </div>
          <div className="rounded-md bg-muted p-3">
            <span className="text-xs font-medium text-muted-foreground">Responsavel</span>
            <strong className="mt-1 block text-sm">{investigation.assignedTo}</strong>
          </div>
          <div className="rounded-md bg-muted p-3">
            <span className="text-xs font-medium text-muted-foreground">Perfil</span>
            <strong className="mt-1 block text-sm">{alert.customer.profile}</strong>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-sm font-semibold">Motivo do alerta</h3>
          <p className="mt-2 rounded-md border border-border bg-slate-50 p-3 text-sm text-slate-700">
            {alert.reason}
          </p>
        </div>

        <div className="mt-5">
          <h3 className="text-sm font-semibold">Transacoes</h3>
          <div className="mt-2 overflow-hidden rounded-md border border-border">
            <div className="grid grid-cols-[1fr_0.9fr_0.9fr] bg-muted px-3 py-2 text-xs font-semibold text-muted-foreground">
              <span>Canal</span>
              <span>Valor</span>
              <span>Data</span>
            </div>
            {alert.transactions.map((transaction) => (
              <div
                className="grid grid-cols-[1fr_0.9fr_0.9fr] border-t border-border px-3 py-2 text-sm"
                key={transaction.id}
              >
                <span className="min-w-0 truncate">{transaction.channel}</span>
                <span className="min-w-0 truncate font-medium">
                  {formatCurrency(transaction.amount)}
                </span>
                <span className="min-w-0 truncate text-muted-foreground">
                  {formatDateTime(transaction.occurredAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-md border border-border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold">Evidencias</h2>
          <Badge tone={investigation.reportReviewed ? 'success' : 'warning'}>
            {investigation.reportReviewed ? 'Relatorio revisado' : 'Rascunho'}
          </Badge>
        </div>

        <div className="mt-4 space-y-3">
          {investigation.evidences.map((evidence) => (
            <article className="rounded-md border border-border p-3" key={evidence.id}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold">{evidence.id}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDateTime(evidence.collectedAt)}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-700">{evidence.description}</p>
              <p className="mt-2 truncate text-xs text-muted-foreground">{evidence.source}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
