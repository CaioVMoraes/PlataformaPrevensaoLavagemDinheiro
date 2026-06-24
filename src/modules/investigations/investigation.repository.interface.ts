import { Investigation } from '../../shared/domain/investigation';

export interface IInvestigationRepository {
  findAll(): Investigation[];
  findById(investigationId: string): Investigation | null;
  close(investigationId: string, conclusion: string): Investigation | null;
}

export const INVESTIGATION_REPOSITORY_TOKEN = Symbol('INVESTIGATION_REPOSITORY_TOKEN');
