import { Alert } from '../../shared/domain/alert';
import { AlertStatus } from '../../shared/domain/alert-status';

export interface IAlertRepository {
  findAll(): Alert[];
  findById(alertId: string): Alert | null;
  updateStatus(alertId: string, status: AlertStatus): Alert | null;
}

export const ALERT_REPOSITORY_TOKEN = Symbol('ALERT_REPOSITORY_TOKEN');
