import { Injectable } from '@nestjs/common';
import { Investigation } from '../../shared/domain/investigation';
import { InvestigationStatus } from '../../shared/domain/investigation-status';
import { mockedInvestigations } from '../../shared/database/mock-data';

@Injectable()
export class InvestigationRepository {
  private readonly investigations: Investigation[] = mockedInvestigations.map((investigation) =>
    this.cloneInvestigation(investigation),
  );

  findAll(): Investigation[] {
    return this.investigations.map((investigation) => this.cloneInvestigation(investigation));
  }

  findById(investigationId: string): Investigation | null {
    const investigation = this.investigations.find((candidate) => candidate.id === investigationId);

    return investigation ? this.cloneInvestigation(investigation) : null;
  }

  close(investigationId: string, conclusion: string): Investigation | null {
    const investigation = this.investigations.find((candidate) => candidate.id === investigationId);

    if (!investigation) {
      return null;
    }

    investigation.status = InvestigationStatus.CLOSED;
    investigation.closedAt = new Date().toISOString();
    investigation.conclusion = conclusion;

    return this.cloneInvestigation(investigation);
  }

  private cloneInvestigation(investigation: Investigation): Investigation {
    return {
      ...investigation,
      evidences: investigation.evidences.map((evidence) => ({ ...evidence })),
    };
  }
}
