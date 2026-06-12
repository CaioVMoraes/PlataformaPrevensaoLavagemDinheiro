'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Bot,
  ClipboardList,
  FileText,
  Gauge,
  PlayCircle,
  RefreshCw,
  Search,
  ShieldCheck,
  Siren,
} from 'lucide-react';
import type React from 'react';
import { useEffect, useMemo } from 'react';
import { AlertQueue } from './alert-queue';
import { AssistantPanel } from './assistant-panel';
import { AuditPanel } from './audit-panel';
import { CasePanel } from './case-panel';
import { DemoPanel } from './demo-panel';
import { MetricTile } from './metric-tile';
import { ReportPanel } from './report-panel';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { listAlerts, listAuditLogs, listInvestigations } from '@/lib/api';
import { DashboardTab, useDashboardStore } from '@/store/dashboard-store';

const tabs = [
  { value: 'case', label: 'Caso', icon: <ClipboardList className="h-4 w-4" /> },
  { value: 'demo', label: 'Demo', icon: <PlayCircle className="h-4 w-4" /> },
  { value: 'assistant', label: 'Assistente', icon: <Bot className="h-4 w-4" /> },
  { value: 'report', label: 'Relatorio', icon: <FileText className="h-4 w-4" /> },
  { value: 'audit', label: 'Auditoria', icon: <ShieldCheck className="h-4 w-4" /> },
] satisfies Array<{ value: DashboardTab; label: string; icon: React.ReactNode }>;

export function DashboardShell() {
  const {
    activeTab,
    selectedAlertId,
    selectedInvestigationId,
    setActiveTab,
    setSelectedAlertId,
    setSelectedInvestigationId,
  } = useDashboardStore();

  const alertsQuery = useQuery({
    queryKey: ['alerts'],
    queryFn: listAlerts,
  });
  const investigationsQuery = useQuery({
    queryKey: ['investigations'],
    queryFn: listInvestigations,
  });
  const auditQuery = useQuery({
    queryKey: ['audit'],
    queryFn: listAuditLogs,
  });

  const alerts = useMemo(() => alertsQuery.data ?? [], [alertsQuery.data]);
  const investigations = useMemo(
    () => investigationsQuery.data ?? [],
    [investigationsQuery.data],
  );
  const auditLogs = useMemo(() => auditQuery.data ?? [], [auditQuery.data]);

  useEffect(() => {
    if (!selectedAlertId && alerts.length > 0) {
      setSelectedAlertId(alerts[0].id);
    }
  }, [alerts, selectedAlertId, setSelectedAlertId]);

  useEffect(() => {
    const linkedInvestigation = investigations.find(
      (investigation) => investigation.alertId === selectedAlertId,
    );

    if (linkedInvestigation && selectedInvestigationId !== linkedInvestigation.id) {
      setSelectedInvestigationId(linkedInvestigation.id);
    }
  }, [investigations, selectedAlertId, selectedInvestigationId, setSelectedInvestigationId]);

  const selectedAlert = alerts.find((alert) => alert.id === selectedAlertId) ?? null;
  const selectedInvestigation =
    investigations.find((investigation) => investigation.id === selectedInvestigationId) ?? null;

  const metrics = useMemo(() => {
    const highRiskCount = alerts.filter(
      (alert) => alert.riskClassification === 'HIGH' || alert.riskClassification === 'CRITICAL',
    ).length;
    const escalationCount = investigations.filter(
      (investigation) => investigation.canProceedToRegulatoryEvaluation,
    ).length;

    return {
      alertCount: alerts.length,
      highRiskCount,
      investigationCount: investigations.length,
      escalationCount,
    };
  }, [alerts, investigations]);

  function renderActivePanel() {
    if (activeTab === 'demo') {
      return <DemoPanel alert={selectedAlert} investigation={selectedInvestigation} />;
    }

    if (activeTab === 'assistant') {
      return <AssistantPanel investigation={selectedInvestigation} />;
    }

    if (activeTab === 'report') {
      return <ReportPanel investigation={selectedInvestigation} />;
    }

    if (activeTab === 'audit') {
      return <AuditPanel auditLogs={auditLogs} />;
    }

    return <CasePanel alert={selectedAlert} investigation={selectedInvestigation} />;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[360px_1fr]">
        <AlertQueue
          alerts={alerts}
          selectedAlertId={selectedAlertId}
          onSelectAlert={(alertId) => {
            setSelectedAlertId(alertId);
            setActiveTab('case');
          }}
        />

        <section className="min-w-0 px-4 py-5 sm:px-6 lg:px-8">
          <header className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary">PLD Investigations</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-normal text-foreground">
                Centro de investigacao
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-3 py-2 text-sm text-muted-foreground shadow-sm">
                <Search className="h-4 w-4" />
                API local ou fallback mockado
              </div>
              <Button
                variant="secondary"
                onClick={() => {
                  void alertsQuery.refetch();
                  void investigationsQuery.refetch();
                  void auditQuery.refetch();
                }}
                type="button"
              >
                <RefreshCw className="h-4 w-4" />
                Recarregar
              </Button>
            </div>
          </header>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricTile
              label="Alertas"
              value={metrics.alertCount}
              icon={<Siren className="h-4 w-4" />}
            />
            <MetricTile
              label="Alto risco"
              value={metrics.highRiskCount}
              icon={<Gauge className="h-4 w-4" />}
            />
            <MetricTile
              label="Investigacoes"
              value={metrics.investigationCount}
              icon={<ClipboardList className="h-4 w-4" />}
            />
            <MetricTile
              label="Regulatorio"
              value={metrics.escalationCount}
              icon={<ShieldCheck className="h-4 w-4" />}
            />
          </div>

          <div className="mt-5">
            <Tabs items={tabs} value={activeTab} onChange={setActiveTab} />
          </div>

          <div className="mt-5">{renderActivePanel()}</div>
        </section>
      </div>
    </main>
  );
}
