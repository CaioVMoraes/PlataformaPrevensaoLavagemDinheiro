import { BadRequestException } from '@nestjs/common';
import { AnalystRole } from '../../shared/domain/analyst-role';
import { AlertRepository } from '../alerts/alert.repository';
import { AlertService } from '../alerts/alert.service';
import { AuditRepository } from '../audit/audit.repository';
import { AuditService } from '../audit/audit.service';
import { InvestigationRepository } from './investigation.repository';
import { InvestigationService } from './investigation.service';

describe('InvestigationService', () => {
  function createService(): InvestigationService {
    const alertRepository = new AlertRepository();
    const auditRepository = new AuditRepository();
    const auditService = new AuditService(auditRepository);
    const alertService = new AlertService(alertRepository, auditService);

    return new InvestigationService(
      new InvestigationRepository(),
      alertService,
      auditService,
    );
  }

  it('blocks closing investigations without reviewed report', () => {
    const service = createService();

    expect(() =>
      service.closeInvestigation('INV-5002', {
        user: 'Bruno Martins',
        userRole: AnalystRole.PLD_COORDINATOR,
        conclusion: 'Caso requer aprofundamento.',
      }),
    ).toThrow(BadRequestException);
  });

  it('closes reviewed investigations with evidence and authorized role', () => {
    const service = createService();

    const investigation = service.closeInvestigation('INV-5001', {
      user: 'Camila Rocha',
      userRole: AnalystRole.PLD_ANALYST,
      conclusion: 'Indicios documentados e relatorio revisado.',
    });

    expect(investigation.status).toBe('CLOSED');
    expect(investigation.conclusion).toBe('Indicios documentados e relatorio revisado.');
  });
});
