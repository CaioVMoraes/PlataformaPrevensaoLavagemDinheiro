import { Injectable } from '@nestjs/common';
import { Alert } from '../../shared/domain/alert';
import { AlertStatus } from '../../shared/domain/alert-status';
import { mockedAlerts } from '../../shared/database/mock-data';
import { IAlertRepository } from './alert.repository.interface';

@Injectable()
export class AlertRepository implements IAlertRepository {
  private readonly alerts: Alert[] = mockedAlerts.map((alert) => this.cloneAlert(alert));

  findAll(): Alert[] {
    return this.alerts.map((alert) => this.cloneAlert(alert));
  }

  findById(alertId: string): Alert | null {
    const alert = this.alerts.find((candidate) => candidate.id === alertId);
    return alert ? this.cloneAlert(alert) : null;
  }

  updateStatus(alertId: string, status: AlertStatus): Alert | null {
    const alert = this.alerts.find((candidate) => candidate.id === alertId);

    if (!alert) {
      return null;
    }

    alert.status = status;
    return this.cloneAlert(alert);
  }

  private cloneAlert(alert: Alert): Alert {
    return {
      ...alert,
      customer: { ...alert.customer },
      transactions: alert.transactions.map((transaction) => ({ ...transaction })),
    };
  }
}
