import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AnalystRole } from '../../shared/domain/analyst-role';
import { AuditEventType } from '../../shared/domain/audit-event-type';
import { Investigation } from '../../shared/domain/investigation';
import { InvestigationStatus } from '../../shared/domain/investigation-status';
import { presentAlert } from '../alerts/alert.presenter';
import { AlertRepository } from '../alerts/alert.repository';
import { AuditService } from '../audit/audit.service';
import { CloseInvestigationDto } from './dto/close-investigation.dto';
import { InvestigationView, presentInvestigation } from './investigation.presenter';
import { InvestigationRepository } from './investigation.repository';

@Injectable()
export class InvestigationService {
  constructor(
    private readonly investigationRepository: InvestigationRepository,
    private readonly alertRepository: AlertRepository,
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

    this.assertCanCloseInvestigation(investigation, input);

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
    const alert = this.alertRepository.findById(investigation.alertId);

    if (!alert) {
      throw new NotFoundException({
        message: 'Alert linked to investigation not found',
        code: 'INVESTIGATION_ALERT_NOT_FOUND',
      });
    }

    return presentInvestigation(investigation, presentAlert(alert));
  }

  private assertCanCloseInvestigation(
    investigation: Investigation,
    input: CloseInvestigationDto,
  ): void {
    const isAuthorizedRole =
      input.userRole === AnalystRole.PLD_ANALYST ||
      input.userRole === AnalystRole.PLD_COORDINATOR;

    if (!isAuthorizedRole) {
      throw new ForbiddenException({
        message: 'User role is not authorized to close investigations',
        code: 'UNAUTHORIZED_INVESTIGATION_ROLE',
      });
    }

    if (investigation.status === InvestigationStatus.CLOSED) {
      throw new BadRequestException({
        message: 'Investigation is already closed',
        code: 'INVESTIGATION_ALREADY_CLOSED',
      });
    }

    if (investigation.evidences.length < 1) {
      throw new BadRequestException({
        message: 'Investigation must have at least one evidence',
        code: 'INVESTIGATION_WITHOUT_EVIDENCE',
      });
    }

    if (!investigation.reportReviewed) {
      throw new BadRequestException({
        message: 'Report must be reviewed before closing the investigation',
        code: 'REPORT_NOT_REVIEWED',
      });
    }
  }
}
