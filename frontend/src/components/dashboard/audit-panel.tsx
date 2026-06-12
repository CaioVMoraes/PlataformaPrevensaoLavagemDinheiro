import { ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AuditLog } from '@/lib/domain';
import { formatDateTime } from '@/lib/formatters';

export function AuditPanel({ auditLogs }: { auditLogs: AuditLog[] }) {
  return (
    <section className="rounded-md border border-border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">Auditoria</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {auditLogs.length} eventos registrados
          </p>
        </div>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-slate-700">
          <ShieldCheck className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-5 overflow-hidden rounded-md border border-border">
        <div className="grid grid-cols-[1fr_0.9fr_0.9fr_0.8fr] bg-muted px-3 py-2 text-xs font-semibold text-muted-foreground">
          <span>Acao</span>
          <span>Usuario</span>
          <span>Recurso</span>
          <span>Data</span>
        </div>
        {auditLogs.map((auditLog) => (
          <div
            className="grid grid-cols-[1fr_0.9fr_0.9fr_0.8fr] border-t border-border px-3 py-2 text-sm"
            key={auditLog.id}
          >
            <span className="min-w-0 truncate font-medium">{auditLog.action}</span>
            <span className="min-w-0 truncate text-muted-foreground">{auditLog.user}</span>
            <span className="min-w-0 truncate text-muted-foreground">{auditLog.resource}</span>
            <span className="min-w-0 truncate text-muted-foreground">
              {formatDateTime(auditLog.occurredAt)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="neutral">Imutavel</Badge>
        <Badge tone="info">Rastreavel</Badge>
        <Badge tone="success">Mascarado</Badge>
      </div>
    </section>
  );
}
