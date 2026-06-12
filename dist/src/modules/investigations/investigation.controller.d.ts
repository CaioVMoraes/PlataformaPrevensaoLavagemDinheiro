import { ApiSuccessResponse } from '../../shared/http/api-response';
import { CloseInvestigationDto } from './dto/close-investigation.dto';
import { InvestigationView } from './investigation.presenter';
import { InvestigationService } from './investigation.service';
export declare class InvestigationController {
    private readonly investigationService;
    constructor(investigationService: InvestigationService);
    listInvestigations(): ApiSuccessResponse<InvestigationView[]>;
    getInvestigation(investigationId: string): ApiSuccessResponse<InvestigationView>;
    closeInvestigation(investigationId: string, input: CloseInvestigationDto): ApiSuccessResponse<InvestigationView>;
}
