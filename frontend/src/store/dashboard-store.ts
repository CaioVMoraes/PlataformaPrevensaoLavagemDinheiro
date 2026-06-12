import { create } from 'zustand';

export type DashboardTab = 'case' | 'demo' | 'assistant' | 'report' | 'audit';

interface DashboardStore {
  selectedAlertId: string | null;
  selectedInvestigationId: string | null;
  activeTab: DashboardTab;
  setSelectedAlertId: (alertId: string) => void;
  setSelectedInvestigationId: (investigationId: string) => void;
  setActiveTab: (tab: DashboardTab) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  selectedAlertId: null,
  selectedInvestigationId: null,
  activeTab: 'case',
  setSelectedAlertId: (alertId) => {
    set({ selectedAlertId: alertId });
  },
  setSelectedInvestigationId: (investigationId) => {
    set({ selectedInvestigationId: investigationId });
  },
  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
}));
