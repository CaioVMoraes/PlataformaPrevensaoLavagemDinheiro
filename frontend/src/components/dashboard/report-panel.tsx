'use client';

import { useQuery } from '@tanstack/react-query';
import { Download, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { generateReport } from '@/lib/api';
import { InvestigationView } from '@/lib/domain';
import { getRiskTone } from '@/lib/badge-tones';
import { formatDateTime, translateRisk } from '@/lib/formatters';

export function ReportPanel({ investigation }: { investigation: InvestigationView | null }) {
  const reportQuery = useQuery({
    queryKey: ['report', investigation?.id],
    queryFn: () => generateReport(investigation?.id ?? ''),
    enabled: Boolean(investigation?.id),
  });

  if (!investigation) {
    return (
      <section className="rounded-md border border-border bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold">Relatorio</h2>
        <p className="mt-2 text-sm text-muted-foreground">Selecione uma investigacao.</p>
      </section>
    );
  }

  if (reportQuery.isLoading) {
    return (
      <section className="rounded-md border border-border bg-white p-5 shadow-sm">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="mt-4 h-24 w-full" />
      </section>
    );
  }

  const report = reportQuery.data;

  if (!report) {
    return null;
  }

  return (
    <section className="rounded-md border border-border bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
            <FileText className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-base font-semibold">{report.id}</h2>
            <p className="text-sm text-muted-foreground">{formatDateTime(report.generatedAt)}</p>
          </div>
        </div>
        <Button variant="secondary" type="button">
          <Download className="h-4 w-4" />
          PDF
        </Button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Badge tone={report.reviewed ? 'success' : 'warning'}>
          {report.reviewed ? 'Revisado' : 'Rascunho'}
        </Badge>
        <Badge tone={getRiskTone(report.suggestedRisk)}>
          {translateRisk(report.suggestedRisk)}
        </Badge>
        <Badge tone={report.canProceedToRegulatoryEvaluation ? 'danger' : 'neutral'}>
          {report.canProceedToRegulatoryEvaluation ? 'Avaliacao regulatoria' : 'Sem escalonamento'}
        </Badge>
      </div>

      <p className="mt-5 rounded-md bg-muted p-4 text-sm leading-6 text-slate-700">
        {report.summary}
      </p>

      <div className="mt-5">
        <h3 className="text-sm font-semibold">Evidencias do relatorio</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {report.evidences.map((evidence) => (
            <article className="rounded-md border border-border p-3" key={evidence.id}>
              <span className="text-sm font-semibold">{evidence.id}</span>
              <p className="mt-2 text-sm text-slate-700">{evidence.description}</p>
              <p className="mt-2 truncate text-xs text-muted-foreground">{evidence.source}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
