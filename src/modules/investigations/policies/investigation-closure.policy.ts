import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { AnalystRole } from '../../../shared/domain/analyst-role';
import { Investigation } from '../../../shared/domain/investigation';
import { InvestigationStatus } from '../../../shared/domain/investigation-status';
import { CloseInvestigationDto } from '../dto/close-investigation.dto';

export const InvestigationClosurePolicy = {
  assertCanClose(investigation: Investigation, input: CloseInvestigationDto): void {
    const isAuthorizedRole = (
      [AnalystRole.PLD_ANALYST, AnalystRole.PLD_COORDINATOR] as string[]
    ).includes(input.userRole);

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
  },
};
