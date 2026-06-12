import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditEventType } from '../../shared/domain/audit-event-type';
import { AuditService } from '../audit/audit.service';
import { AlertView, presentAlert } from './alert.presenter';
import { AlertRepository } from './alert.repository';
import { UpdateAlertStatusDto } from './dto/update-alert-status.dto';

@Injectable()
export class AlertService {
  constructor(
    private readonly alertRepository: AlertRepository,
    private readonly auditService: AuditService,
  ) {}

  listAlerts(): AlertView[] {
    return this.alertRepository.findAll().map((alert) => presentAlert(alert));
  }

  getAlert(alertId: string): AlertView {
    const alert = this.alertRepository.findById(alertId);

    if (!alert) {
      throw new NotFoundException({
        message: 'Alert not found',
        code: 'ALERT_NOT_FOUND',
      });
    }

    this.auditService.register({
      user: 'local-api',
      action: AuditEventType.TRANSACTION_QUERY,
      resource: alertId,
      result: 'SUCCESS',
      metadata: {
        transactionCount: String(alert.transactions.length),
      },
    });

    return presentAlert(alert);
  }

  updateStatus(alertId: string, input: UpdateAlertStatusDto): AlertView {
    const currentAlert = this.alertRepository.findById(alertId);

    if (!currentAlert) {
      throw new NotFoundException({
        message: 'Alert not found',
        code: 'ALERT_NOT_FOUND',
      });
    }

    const updatedAlert = this.alertRepository.updateStatus(alertId, input.status);

    if (!updatedAlert) {
      throw new NotFoundException({
        message: 'Alert not found',
        code: 'ALERT_NOT_FOUND',
      });
    }

    this.auditService.register({
      user: input.user,
      action: AuditEventType.STATUS_CHANGED,
      resource: alertId,
      result: 'SUCCESS',
      metadata: {
        reason: input.reason,
        previousStatus: currentAlert.status,
        newStatus: input.status,
      },
    });

    return presentAlert(updatedAlert);
  }
}
