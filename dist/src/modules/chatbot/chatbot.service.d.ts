import { AuditService } from '../audit/audit.service';
import { ChatbotQueryDto } from './dto/chatbot-query.dto';
import { ChatbotAnswer } from './chatbot-response';
import { InvestigationService } from '../investigations/investigation.service';
export declare class ChatbotService {
    private readonly investigationService;
    private readonly auditService;
    constructor(investigationService: InvestigationService, auditService: AuditService);
    answerQuestion(input: ChatbotQueryDto): ChatbotAnswer;
}
