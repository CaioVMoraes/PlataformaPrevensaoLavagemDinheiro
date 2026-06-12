import { Investigation } from '../../shared/domain/investigation';
export declare class InvestigationRepository {
    private readonly investigations;
    findAll(): Investigation[];
    findById(investigationId: string): Investigation | null;
    close(investigationId: string, conclusion: string): Investigation | null;
    private cloneInvestigation;
}
