import { ApiSuccessResponse } from '../../shared/http/api-response';
import { ChatbotAnswer } from './chatbot-response';
import { ChatbotService } from './chatbot.service';
import { ChatbotQueryDto } from './dto/chatbot-query.dto';
export declare class ChatbotController {
    private readonly chatbotService;
    constructor(chatbotService: ChatbotService);
    answerQuestion(input: ChatbotQueryDto): ApiSuccessResponse<ChatbotAnswer>;
}
