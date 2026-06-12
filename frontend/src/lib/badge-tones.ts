import { BadgeTone } from '@/components/ui/badge';
import { AlertStatus, InvestigationStatus, RiskClassification } from './domain';

export function getRiskTone(riskClassification: RiskClassification): BadgeTone {
  const tones: Record<RiskClassification, BadgeTone> = {
    LOW: 'success',
    MEDIUM: 'info',
    HIGH: 'warning',
    CRITICAL: 'danger',
  };

  return tones[riskClassification];
}

export function getAlertStatusTone(status: AlertStatus): BadgeTone {
  const tones: Record<AlertStatus, BadgeTone> = {
    PENDING: 'neutral',
    IN_ANALYSIS: 'info',
    COMPLETED: 'success',
    FALSE_POSITIVE: 'neutral',
    REGULATORY_ESCALATION: 'danger',
  };

  return tones[status];
}

export function getInvestigationStatusTone(status: InvestigationStatus): BadgeTone {
  const tones: Record<InvestigationStatus, BadgeTone> = {
    OPEN: 'neutral',
    UNDER_REVIEW: 'warning',
    CLOSED: 'success',
  };

  return tones[status];
}
