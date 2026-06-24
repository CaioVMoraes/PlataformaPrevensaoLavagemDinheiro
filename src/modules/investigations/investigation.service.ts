import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AuditEventType } from '../../shared/domain/audit-event-type';
import { Investigation } from '../../shared/domain/investigation';
import { presentAlert } from '../alerts/alert.presenter';
import { AlertService } from '../alerts/alert.service';
import { AuditService } from '../audit/audit.service';
import { CloseInvestigationDto } from './dto/close-investigation.dto';
import { InvestigationView, presentInvestigation } from './investigation.presenter';
import { IInvestigationRepository, INVESTIGATION_REPOSITORY_TOKEN } from './investigation.repository.interface';
import { InvestigationClosurePolicy } from './policies/investigation-closure.policy';

@Injectable()
export class InvestigationService {
  constructor(
    @Inject(INVESTIGATION_REPOSITORY_TOKEN)
    private readonly investigationRepository: IInvestigationRepository,
    private readonly alertService: AlertService,
    private readonly auditService: AuditService,
  ) {}

  listInvestigations(): InvestigationView[] {
    return this.investigationRepository
      .findAll()
      .map((investigation) => this.toInvestigationView(investigation));
  }

  getInvestigation(investigationId: string): InvestigationView {
    const investigation = this.findInvestigationOrThrow(investigationId);
    return this.toInvestigationView(investigation);
  }

  closeInvestigation(investigationId: string, input: CloseInvestigationDto): InvestigationView {
    const investigation = this.findInvestigationOrThrow(investigationId);

    InvestigationClosurePolicy.assertCanClose(investigation, input);

    const closedInvestigation = this.investigationRepository.close(
      investigationId,
      input.conclusion,
    );

    if (!closedInvestigation) {
      throw new NotFoundException({
        message: 'Investigation not found',
        code: 'INVESTIGATION_NOT_FOUND',
      });
    }

    this.auditService.register({
      user: input.user,
      action: AuditEventType.INVESTIGATION_FINISHED,
      resource: investigationId,
      result: 'SUCCESS',
      metadata: {
        alertId: closedInvestigation.alertId,
        previousStatus: investigation.status,
        newStatus: closedInvestigation.status,
      },
    });

    return this.toInvestigationView(closedInvestigation);
  }

  private findInvestigationOrThrow(investigationId: string): Investigation {
    const investigation = this.investigationRepository.findById(investigationId);

    if (!investigation) {
      throw new NotFoundException({
        message: 'Investigation not found',
        code: 'INVESTIGATION_NOT_FOUND',
      });
    }

    return investigation;
  }

  private toInvestigationView(investigation: Investigation): InvestigationView {
    const alert = this.alertService.findAlertById(investigation.alertId);

    if (!alert) {
      throw new NotFoundException({
        message: 'Alert linked to investigation not found',
        code: 'INVESTIGATION_ALERT_NOT_FOUND',
      });
    }

    return presentInvestigation(investigation, presentAlert(alert));
  }
}
