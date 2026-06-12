'use client';

import { AlertTriangle, ChevronRight, Clock3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AlertView } from '@/lib/domain';
import { formatCurrency, formatDateTime, translateAlertStatus, translateRisk } from '@/lib/formatters';
import { getAlertStatusTone, getRiskTone } from '@/lib/badge-tones';
import { cn } from '@/lib/utils';

export function AlertQueue({
  alerts,
  selectedAlertId,
  onSelectAlert,
}: {
  alerts: AlertView[];
  selectedAlertId: string | null;
  onSelectAlert: (alertId: string) => void;
}) {
  return (
    <section className="flex min-h-0 flex-col border-r border-border bg-white">
      <div className="border-b border-border px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">Alertas</h2>
            <p className="mt-1 text-sm text-muted-foreground">{alerts.length} casos na fila</p>
          </div>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-red-50 text-red-600">
            <AlertTriangle className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto p-3">
        <div className="space-y-2">
          {alerts.map((alert) => {
            const totalAmount = alert.transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
            const selected = selectedAlertId === alert.id;

            return (
              <button
                className={cn(
                  'w-full rounded-md border p-3 text-left transition-colors',
                  selected
                    ? 'border-primary bg-teal-50'
                    : 'border-border bg-white hover:border-slate-300 hover:bg-muted/60',
                )}
                key={alert.id}
                onClick={() => {
                  onSelectAlert(alert.id);
                }}
                type="button"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold">{alert.id}</span>
                      <Badge tone={getRiskTone(alert.riskClassification)}>
                        {translateRisk(alert.riskClassification)}
                      </Badge>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{alert.reason}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge tone={getAlertStatusTone(alert.status)}>
                    {translateAlertStatus(alert.status)}
                  </Badge>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock3 className="h-3.5 w-3.5" />
                    {formatDateTime(alert.createdAt)}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded bg-muted px-2 py-1.5">
                    <span className="block text-muted-foreground">Cliente</span>
                    <span className="block truncate font-medium">{alert.customer.name}</span>
                  </div>
                  <div className="rounded bg-muted px-2 py-1.5">
                    <span className="block text-muted-foreground">Volume</span>
                    <span className="block truncate font-medium">{formatCurrency(totalAmount)}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
